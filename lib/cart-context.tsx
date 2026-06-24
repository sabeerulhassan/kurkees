'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
  slug: string
  name: string
  size: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (slug: string, size: string) => void
  updateQuantity: (slug: string, size: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Hydrate cart from LocalStorage on mount safely
  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem('kurkees_cart')
    if (stored) {
      try {
        setCart(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse cart storage', e)
      }
    }
  }, [])

  // Persist to LocalStorage whenever cart updates
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('kurkees_cart', JSON.stringify(cart))
    }
  }, [cart, isMounted])

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) => i.slug === newItem.slug && i.size === newItem.size
      )
      if (exists) {
        return prev.map((i) =>
          i.slug === newItem.slug && i.size === newItem.size
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      }
      return [...prev, { ...newItem, quantity: qty }]
    })
  }

  const removeFromCart = (slug: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)))
  }

  const updateQuantity = (slug: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(slug, size)
      return
    }
    setCart((prev) =>
      prev.map((i) =>
        i.slug === slug && i.size === size ? { ...i, quantity: qty } : i
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}