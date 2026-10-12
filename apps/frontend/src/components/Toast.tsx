'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <span className="toast-icon">✓</span>
      <span className="toast-text">{toastMessage}</span>
    </div>
  );
}
