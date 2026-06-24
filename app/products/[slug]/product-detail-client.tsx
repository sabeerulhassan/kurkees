'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  Phone, CheckCircle, Lightbulb, Ban, ShoppingCart, 
  CreditCard, Plus, Minus, ShieldCheck, Truck, Sparkles, Play
} from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export function ProductDetailClient({ product }: { product: any }) {
  const router = useRouter()
  const { addToCart, setIsCartOpen } = useCart()
  
  // Size selection states
  const defaultSizeIndex = product.sizes.findIndex((s: any) => s.size === '340g' && s.in_stock)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(
    defaultSizeIndex !== -1 ? defaultSizeIndex : 0
  )
  const currentOption = product.sizes[selectedSizeIndex]

  // Local Quantity state (PDP Selector)
  const [quantity, setQuantity] = useState(1)

  // Active slide state
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  // Fallback Logic: size-images array or default product gallery
  const activeImages = currentOption?.size_images && currentOption.size_images.length > 0
    ? currentOption.size_images
    : product.images;

  // Video Fallback
  const activeYoutubeId = currentOption?.size_youtube_id || product.default_youtube_id

  // --- DYNAMIC SLIDES CONSTRUCTOR ---
  // Re-builds the slider collection whenever size selections update
  const slides: { type: 'image' | 'video'; url: string }[] = []

  // Rule 1: If video is present, push it as the VERY first slide
  if (activeYoutubeId) {
    slides.push({ type: 'video', url: activeYoutubeId })
  }

  // Rule 2: Append all product images
  if (activeImages && activeImages.length > 0) {
    activeImages.forEach((img: any) => {
      // Handles both raw strings and structured image objects from the DB
      const url = typeof img === 'string' ? img : img.image_url
      if (url) slides.push({ type: 'image', url })
    })
  }

  // UX Safety Guard: Reset gallery slider back to slide 1 (index 0) whenever the size switches
  useEffect(() => {
    setActiveSlideIndex(0)
  }, [selectedSizeIndex])

  // Helper to generate elegant dynamic SKUs automatically
  const generateSKU = (slug: string, sizeName: string) => {
    const parts = slug.split('-');
    const initials = parts.map(p => p.charAt(0).toUpperCase()).join('');
    return `KRK-${initials}-${sizeName.toUpperCase()}`;
  };

  const handleAddToCart = () => {
    if (!currentOption) return
    
    // Find first available product image to represent the product inside the cart drawer
    const cartDisplayImg = activeImages?.[0]?.image_url || '/placeholder.svg'

    addToCart({
      slug: product.slug,
      name: product.name,
      size: currentOption.size,
      price: currentOption.price,
      image: cartDisplayImg,
    }, quantity)
    setIsCartOpen(true)
  }

  const handleBuyNow = () => {
    if (!currentOption) return
    const cartDisplayImg = activeImages?.[0]?.image_url || '/placeholder.svg'

    addToCart({
      slug: product.slug,
      name: product.name,
      size: currentOption.size,
      price: currentOption.price,
      image: cartDisplayImg,
    }, quantity)
    router.push('/checkout')
  }

  const whatsappNumber = '94777278378'
  const message = encodeURIComponent(
    `Hi Kurkees! I would like to order the "${product.name}" in the ${currentOption?.size} size for Rs. ${currentOption?.price.toLocaleString()}. Please process my order as Cash on Delivery (COD).`
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  const currentSlide = slides[activeSlideIndex]

  return (
    <div className="grid gap-10 lg:grid-cols-12 bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm">
      
      {/* Column Left: Media Panels (Images & Videos Gallery Slider) */}
      <div className="lg:col-span-5 flex flex-col gap-4 w-full">
        {/* Main Display Window */}
        <div className="relative aspect-square w-full rounded-xl bg-stone-50/50 border border-stone-150 overflow-hidden flex items-center justify-center shadow-xs">
          {currentSlide ? (
            currentSlide.type === 'video' ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentSlide.url}?autoplay=0&mute=1&loop=1`}
                title="Product Video"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={currentSlide.url}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 transition-all duration-300"
              />
            )
          ) : (
            <div className="relative aspect-square w-full max-w-sm">
              <Image src="/placeholder.svg" alt="Placeholder" fill className="object-contain" />
            </div>
          )}
        </div>

        {/* Horizontal Navigation Thumbnails */}
        {slides.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`relative h-14 w-14 rounded-lg bg-stone-50 border overflow-hidden flex items-center justify-center shrink-0 transition-all ${
                    isActive
                      ? "border-amber-700 bg-amber-50/30 ring-2 ring-amber-700/10"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {slide.type === 'video' ? (
                    <>
                      {/* Pull high-res video cover directly from YouTube CDN */}
                      <img 
                        src={`https://img.youtube.com/vi/${slide.url}/hqdefault.jpg`} 
                        alt="Video Thumbnail" 
                        className="object-cover w-full h-full"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-white rounded-md">
                        <Play size={16} className="fill-white" />
                      </span>
                    </>
                  ) : (
                    <img src={slide.url} alt="Gallery Thumbnail" className="object-contain p-1 w-full h-full" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Column Right: Product Information & Interactive Panel */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Freshly Made in Sri Lanka
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider border ${
              currentOption?.in_stock 
                ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                : "bg-stone-50 text-stone-400 border-stone-150"
            }`}>
              {currentOption?.in_stock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          
          <h1 className="mt-4 font-heading text-3xl font-bold text-stone-900 sm:text-4xl lg:text-5xl leading-tight">
            {product.name}
          </h1>
          <p className="font-sans text-base text-stone-500 mt-1">
            {product.flavor}
          </p>

          <p className="font-sans text-sm leading-relaxed text-stone-600 mt-6">
            {product.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 font-sans text-xs font-bold text-stone-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-amber-700" />
              <span>Ingredients: {product.ingredients}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-amber-700" />
              <span>Freshly roasted & ground without hydrogenated palm oils</span>
            </div>
          </div>

          {/* Interactive Option Chips */}
          <div className="mt-8">
            <label className="block font-sans text-[10px] font-bold text-stone-450 uppercase tracking-wider mb-2">
              Select Size Option
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((opt: any, idx: number) => {
                const isSelected = idx === selectedSizeIndex;
                return (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => {
                      setSelectedSizeIndex(idx);
                      setQuantity(1); // Reset quantity selector
                    }}
                    className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      isSelected
                        ? "border-amber-700 bg-amber-50 text-amber-800"
                        : "border-stone-200 bg-white text-stone-500 hover:border-stone-400 hover:text-stone-850"
                    }`}
                  >
                    {opt.size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-150 pt-6 gap-4">
            <div className="flex flex-col">
              <span className="font-sans text-[9px] uppercase font-bold text-stone-400 tracking-wider">
                Price per jar
              </span>
              <span className="font-heading text-3xl font-bold text-stone-900 mt-1">
                Rs. {currentOption?.price.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-center sm:text-right">
              <span className="font-sans text-[10px] font-bold text-amber-800 flex items-center justify-center sm:justify-end gap-1">
                <Sparkles size={12} /> Auto 12% First-Time discount applied at checkout!
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Selector & CTA Controls */}
        <div className="mt-8 pt-8 border-t border-stone-150">
          {currentOption?.in_stock ? (
            <div className="flex flex-wrap items-center gap-3 w-full">
              {/* Quantity Selector */}
              <div className="w-full sm:w-auto">
                <div className="flex items-center border border-stone-200 rounded-full bg-white h-12 px-3 shadow-xs justify-between sm:justify-start">
                  <button 
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-sans font-bold text-sm w-12 text-center text-stone-850">{quantity}</span>
                  <button 
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="flex-1 min-w-[200px] flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 h-12 font-heading text-sm font-bold transition-all shadow-xs"
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Basket
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-amber-700 hover:bg-amber-800 text-white h-12 font-heading text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <CreditCard className="h-4 w-4" /> Buy Now
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 font-heading text-sm font-bold shadow-sm transition-transform hover:-translate-y-0.5 text-center mt-1"
              >
                <Phone className="h-4 w-4" /> Order via WhatsApp
              </a>
            </div>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 rounded-full bg-stone-50 border border-stone-200 px-6 py-3.5 font-heading text-sm font-bold text-stone-400 cursor-not-allowed text-center"
            >
              <Ban className="h-4.5 w-4.5" /> Out of Stock
            </button>
          )}

          {/* Symmetrical Artisanal Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-150 mt-8 pt-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-50 border border-stone-200 text-stone-600">
                <Truck size={14} />
              </span>
              <div>
                <h4 className="font-heading text-xs font-bold text-stone-900 leading-none">Islandwide COD</h4>
                <p className="text-[10px] font-sans text-stone-400 mt-1">Rs. 200 flat delivery rate</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-50 border border-stone-200 text-stone-600">
                <CheckCircle size={14} />
              </span>
              <div>
                <h4 className="font-heading text-xs font-bold text-stone-900 leading-none">Fresh Batches</h4>
                <p className="text-[10px] font-sans text-stone-400 mt-1">Stone-ground weekly</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-50 border border-stone-200 text-stone-600">
                <ShieldCheck size={14} />
              </span>
              <div>
                <h4 className="font-heading text-xs font-bold text-stone-900 leading-none">Verifiable Quality</h4>
                <p className="text-[10px] font-sans text-stone-400 mt-1">100% Secure Checkout</p>
              </div>
            </div>
          </div>

          {/* Operational Metadata Section */}
          <div className="flex items-center justify-between border-t border-stone-150 mt-6 pt-4 text-xs font-sans text-stone-400">
            <span>SKU: {generateSKU(product.slug, currentOption?.size || "340g")}</span>
            <span>Category: Premium Peanut Butter</span>
          </div>
        </div>

      </div>
    </div>
  )
}