'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalPrice: number;
  promoCode: string | null;
  promoError: string | null;
  isCartOpen: boolean;
  toastMessage: string | null;
  addItem: (product: Product, size?: string, price?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'brewlite_cart_v1';
const DEFAULT_SIZE = 'Size Vừa';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on client mount (SSR safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore JSON parse error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota error
    }
  }, [items, isLoaded]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const addItem = (
    product: Product,
    size: string = DEFAULT_SIZE,
    price: number = product.price,
  ) => {
    const itemId = `${product.id}-${size}`;
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price,
          image: product.image,
          size,
          quantity: 1,
        },
      ];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoError(null);
  };

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    if (!promoCode) return 0;
    if (promoCode.toUpperCase() === 'BREW10') {
      return Math.round(subtotal * 0.1); // Giảm 10%
    }
    return 0;
  }, [promoCode, subtotal]);

  const shippingFee = 0; // Phí dịch vụ miễn phí như Figma

  const totalPrice = useMemo(() => {
    return Math.max(0, subtotal - discount + shippingFee);
  }, [subtotal, discount, shippingFee]);

  const applyPromo = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'BREW10') {
      setPromoCode('BREW10');
      setPromoError(null);
      showToast('Áp dụng mã giảm giá 10% thành công!');
      return true;
    } else {
      setPromoError('Mã không hợp lệ. Hãy thử: BREW10');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode(null);
    setPromoError(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        subtotal,
        discount,
        shippingFee,
        totalPrice,
        promoCode,
        promoError,
        isCartOpen,
        toastMessage,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromo,
        removePromo,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
