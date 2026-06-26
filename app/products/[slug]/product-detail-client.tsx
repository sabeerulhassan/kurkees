'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Ban,
  CheckCircle,
  CreditCard,
  ImageOff,
  Maximize2,
  MessageCircle,
  Minus,
  Play,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from 'lucide-react'
import {
  getApiProductImage,
  getImageVariantUrl,
  isSizeInStock,
  type StoreProduct,
} from '@/lib/api-products'
import { useCart } from '@/lib/cart-context'

// Product detail media is entirely API-driven.
// The list view uses thumbnails, the PDP uses medium images, and fullscreen uses full-size images when the API provides them.
type ProductSlide = {
  type: 'image' | 'video'
  url: string
  thumbnailUrl: string
  fullUrl?: string
  alt: string
}

function buildSlides(product: StoreProduct, selectedSize: any): ProductSlide[] {
  const slides: ProductSlide[] = []
  const youtubeId = selectedSize?.size_youtube_id || product.default_youtube_id

  if (youtubeId) {
    slides.push({
      type: 'video',
      url: youtubeId,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      alt: `${product.name} video`,
    })
  }

  const sizeImages = Array.isArray(selectedSize?.size_images) ? selectedSize.size_images : []
  const productImages = Array.isArray(product.images) ? product.images : []
  const activeImages = sizeImages.length > 0 ? sizeImages : productImages

  for (const image of activeImages) {
    const mediumUrl = getImageVariantUrl(image, 'medium') || getImageVariantUrl(image, 'default')
    const thumbnailUrl = getImageVariantUrl(image, 'thumbnail') || mediumUrl
    const fullUrl = getImageVariantUrl(image, 'full') || mediumUrl

    if (!mediumUrl) continue

    const duplicate = slides.some((slide) => slide.type === 'image' && slide.url === mediumUrl)
    if (!duplicate) {
      slides.push({
        type: 'image',
        url: mediumUrl,
        thumbnailUrl: thumbnailUrl || mediumUrl,
        fullUrl: fullUrl || mediumUrl,
        alt: image?.alt_text || `${product.name} jar`,
      })
    }
  }

  const fallbackMedium = getApiProductImage(product, 'medium') || getApiProductImage(product)
  if (fallbackMedium && !slides.some((slide) => slide.type === 'image' && slide.url === fallbackMedium)) {
    slides.push({
      type: 'image',
      url: fallbackMedium,
      thumbnailUrl: getApiProductImage(product, 'thumbnail') || fallbackMedium,
      fullUrl: getApiProductImage(product, 'full') || fallbackMedium,
      alt: `${product.name} jar`,
    })
  }

  return slides
}

function getCartImage(product: StoreProduct, selectedSize: any) {
  const sizeImages = Array.isArray(selectedSize?.size_images) ? selectedSize.size_images : []
  const firstSizeImage = sizeImages[0]
  return (
    getImageVariantUrl(firstSizeImage, 'thumbnail') ||
    getImageVariantUrl(firstSizeImage, 'medium') ||
    getApiProductImage(product, 'thumbnail') ||
    getApiProductImage(product, 'medium') ||
    ''
  )
}

function generateSKU(slug: string, sizeName: string) {
  const parts = slug.split('-')
  const initials = parts.map((part) => part.charAt(0).toUpperCase()).join('')
  return `KRK-${initials}-${sizeName.toUpperCase()}`
}

export function ProductDetailClient({ product }: { product: StoreProduct }) {
  const router = useRouter()
  const { addToCart, setIsCartOpen } = useCart()

  const defaultSizeIndex = product.sizes.findIndex((size) => size.size === '340g' && isSizeInStock(size))
  const firstInStockIndex = product.sizes.findIndex((size) => isSizeInStock(size))
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    defaultSizeIndex !== -1 ? defaultSizeIndex : firstInStockIndex !== -1 ? firstInStockIndex : 0
  )
  const [quantity, setQuantity] = useState(1)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [fullscreenImage, setFullscreenImage] = useState<ProductSlide | null>(null)
  const [brokenUrls, setBrokenUrls] = useState<Set<string>>(() => new Set())

  const currentOption = product.sizes[selectedSizeIndex]
  const currentInStock = isSizeInStock(currentOption)
  const slides = useMemo(() => buildSlides(product, currentOption), [product, currentOption])
  const currentSlide = slides[activeSlideIndex] || slides[0]

  useEffect(() => {
    setQuantity(1)
    setActiveSlideIndex(0)
  }, [selectedSizeIndex])

  useEffect(() => {
    if (activeSlideIndex > slides.length - 1) {
      setActiveSlideIndex(0)
    }
  }, [activeSlideIndex, slides.length])

  const whatsappUrl = useMemo(() => {
    const whatsappNumber = '94777278378'
    const message = encodeURIComponent(
      `Hi Kurkees, I have a question about ${product.name}${currentOption?.size ? ` - ${currentOption.size}` : ''} before I order on the website.`
    )
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }, [currentOption?.size, product.name])


  useEffect(() => {
    if (!fullscreenImage) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenImage(null)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fullscreenImage])

  const markBroken = (url?: string) => {
    if (!url) return
    setBrokenUrls((current) => new Set(current).add(url))
  }

  const handleAddToCart = () => {
    if (!currentOption || !currentInStock) return

    addToCart(
      {
        slug: product.slug,
        name: product.name,
        size: currentOption.size,
        price: currentOption.price,
        image: getCartImage(product, currentOption),
      },
      quantity
    )
    setIsCartOpen(true)
  }

  const handleBuyNow = () => {
    if (!currentOption || !currentInStock) return

    addToCart(
      {
        slug: product.slug,
        name: product.name,
        size: currentOption.size,
        price: currentOption.price,
        image: getCartImage(product, currentOption),
      },
      quantity
    )
    router.push('/checkout')
  }

  return (
    <>
      <section className="grid gap-5 rounded-3xl border border-stone-200 bg-white p-0 pb-28 sm:gap-8 sm:p-6 lg:grid-cols-12 lg:p-8">
        <div className="lg:col-span-6 xl:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-white sm:rounded-2xl sm:border sm:border-stone-200">
            {currentSlide ? (
              currentSlide.type === 'video' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentSlide.url}?autoplay=0&mute=1&rel=0&playsinline=1`}
                  title={`${product.name} product video`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  {brokenUrls.has(currentSlide.url) ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-50 px-6 text-center font-sans text-sm font-semibold text-stone-400">
                      <ImageOff className="h-8 w-8" />
                      <span>Product photo unavailable.</span>
                    </div>
                  ) : (
                    <img
                      src={currentSlide.url}
                      alt={currentSlide.alt}
                      loading="eager"
                      decoding="async"
                      onError={() => markBroken(currentSlide.url)}
                      className="h-full w-full object-contain"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setFullscreenImage(currentSlide)}
                    className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-800 shadow-sm transition hover:bg-stone-50 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
                    aria-label="View product image fullscreen"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </button>
                </>
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-stone-50 px-8 text-center font-sans text-sm font-semibold text-stone-400">
                Product photo unavailable
              </div>
            )}
          </div>

          {slides.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-2 sm:mt-4 sm:gap-3 sm:px-0">
              {slides.map((slide, index) => {
                const isActive = index === activeSlideIndex
                return (
                  <button
                    key={`${slide.type}-${slide.url}-${index}`}
                    type="button"
                    onClick={() => setActiveSlideIndex(index)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white transition sm:h-20 sm:w-20 ${
                      isActive
                        ? 'border-[var(--brand-red)] ring-2 ring-[var(--brand-red)]/15'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                    aria-label={`View ${slide.type === 'video' ? 'product video' : 'product image'} ${index + 1}`}
                  >
                    {slide.type === 'video' ? (
                      <>
                        <img
                          src={slide.thumbnailUrl}
                          alt="Product video thumbnail"
                          loading="lazy"
                          decoding="async"
                          onError={() => markBroken(slide.thumbnailUrl)}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-white">
                          <Play className="h-5 w-5 fill-white" />
                        </span>
                      </>
                    ) : brokenUrls.has(slide.thumbnailUrl) ? (
                      <div className="flex h-full w-full items-center justify-center text-stone-300">
                        <ImageOff className="h-5 w-5" />
                      </div>
                    ) : (
                      <img
                        src={slide.thumbnailUrl}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        onError={() => markBroken(slide.thumbnailUrl)}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col px-4 pb-4 sm:px-0 sm:pb-0 lg:col-span-6 xl:col-span-7">
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full border border-stone-200 bg-white px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-stone-600">
                {tag}
              </span>
            ))}
            <span className={`rounded-full border px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] ${currentInStock ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-stone-200 bg-stone-50 text-stone-400'}`}>
              {currentInStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-[var(--brand-brown)] sm:mt-5 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 font-sans text-base font-semibold text-stone-500 sm:text-lg">
            {product.flavor}
          </p>

          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-stone-600 sm:mt-5 sm:text-base">
            {product.description}
          </p>

          <div className="mt-5 grid gap-3 font-sans text-sm text-stone-700 sm:mt-6 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red)]" />
              <span>Ingredients: {product.ingredients}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red)]" />
              <span>Fresh jar options for everyday use</span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <label className="mb-3 block font-sans text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
              Select jar size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option, index) => {
                const isSelected = index === selectedSizeIndex
                const optionInStock = isSizeInStock(option)

                return (
                  <button
                    key={`${option.size}-${option.price}`}
                    type="button"
                    onClick={() => setSelectedSizeIndex(index)}
                    disabled={!optionInStock}
                    aria-label={`Select ${option.size} jar, Rs. ${option.price.toLocaleString()}`}
                    className={`min-w-[76px] rounded-full border px-4 py-2 text-center font-sans text-sm font-extrabold transition ${
                      isSelected
                        ? 'border-[var(--brand-red)] bg-[var(--brand-yellow)] text-[var(--brand-brown)] shadow-[0_2px_0_var(--brand-brown)]'
                        : optionInStock
                          ? 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                          : 'cursor-not-allowed border-stone-200 bg-stone-50 text-stone-400 opacity-60'
                    }`}
                  >
                    {option.size}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-stone-200 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-stone-400">Price per jar</p>
              <p className="mt-1 font-heading text-3xl font-bold text-[var(--brand-brown)] sm:text-4xl">
                {currentOption ? `Rs. ${currentOption.price.toLocaleString()}` : 'Select size'}
              </p>
            </div>

            <div className="inline-flex h-12 w-full items-center justify-between rounded-full border border-stone-200 bg-white px-3 sm:w-auto">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="rounded-full p-2 text-stone-700 hover:bg-stone-100"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-12 text-center font-heading text-lg font-bold text-[var(--brand-brown)]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="rounded-full p-2 text-stone-700 hover:bg-stone-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 hidden flex-col gap-3 sm:flex sm:flex-row">
            {currentInStock ? (
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3.5 font-heading text-sm font-bold text-[var(--brand-brown)] transition hover:bg-stone-50"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to basket
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="brand-button-primary flex-1 justify-center"
                >
                  <CreditCard className="h-5 w-5" /> Buy now
                </button>
              </>
            ) : (
              <button
                disabled
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-stone-100 px-6 py-3.5 font-heading text-sm font-bold text-stone-400"
              >
                <Ban className="h-5 w-5" /> Out of stock
              </button>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700 bg-white px-6 py-3.5 font-heading text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              <MessageCircle className="h-5 w-5" /> Ask on WhatsApp
            </a>
          </div>

          <div className="mt-8 grid gap-4 border-t border-stone-200 pt-6 sm:grid-cols-3">
            <div className="flex gap-3">
              <Truck className="h-5 w-5 shrink-0 text-[var(--brand-red)]" />
              <div>
                <h4 className="font-heading text-sm font-bold text-[var(--brand-brown)]">Islandwide delivery</h4>
                <p className="mt-1 font-sans text-xs font-medium text-stone-500">Checkout online and confirm your details.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 shrink-0 text-[var(--brand-red)]" />
              <div>
                <h4 className="font-heading text-sm font-bold text-[var(--brand-brown)]">Fresh batches</h4>
                <p className="mt-1 font-sans text-xs font-medium text-stone-500">Made in practical family-friendly jars.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--brand-red)]" />
              <div>
                <h4 className="font-heading text-sm font-bold text-[var(--brand-brown)]">Secure checkout</h4>
                <p className="mt-1 font-sans text-xs font-medium text-stone-500">WhatsApp is available for quick questions.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4 font-sans text-xs font-bold text-stone-400">
            <span>SKU: {generateSKU(product.slug, currentOption?.size || '340g')}</span>
            <span>Category: Peanut butter</span>
          </div>
        </div>
      </section>


      {currentInStock && currentOption && !fullscreenImage && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-4 py-3 shadow-[0_-10px_24px_rgba(41,25,12,.12)] backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-md items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">{currentOption.size}</p>
              <p className="font-heading text-xl font-bold leading-none text-[var(--brand-brown)]">Rs. {currentOption.price.toLocaleString()}</p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-[var(--brand-brown)]"
              aria-label="Add to basket"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-red)] px-5 font-heading text-sm font-bold text-white"
            >
              Buy now
            </button>
          </div>
        </div>
      )}

      {fullscreenImage?.type === 'image' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full size product image"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            type="button"
            onClick={() => setFullscreenImage(null)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-stone-900 shadow-lg"
            aria-label="Close fullscreen image"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={fullscreenImage.fullUrl || fullscreenImage.url}
            alt={fullscreenImage.alt}
            className="max-h-[92vh] max-w-[94vw] object-contain"
            onError={() => markBroken(fullscreenImage.fullUrl || fullscreenImage.url)}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
