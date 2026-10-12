'use client';

import React from 'react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

function formatVND(amount: number) {
  return amount.toLocaleString('vi-VN') + 'đ';
}

export default function ProductCard({
  product,
  badge,
  isFavorite = false,
}: {
  product: Product;
  badge?: 'BÁN CHẠY' | 'MỚI';
  isFavorite?: boolean;
}) {
  const { addItem, items } = useCart();

  // Check if item is already in cart
  const inCartQty = items
    .filter((i) => i.productId === product.id)
    .reduce((sum, i) => sum + i.quantity, 0);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 'Size Vừa');
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-badges-row">
          {badge ? (
            <span
              className={`product-tag ${badge === 'BÁN CHẠY' ? 'tag-best' : 'tag-new'}`}
            >
              {badge}
            </span>
          ) : (
            <span />
          )}

          {isFavorite ? (
            <span className="product-tag-favorite">★ Yêu thích</span>
          ) : null}
        </div>
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        {product.description ? (
          <p className="product-desc">{product.description}</p>
        ) : null}

        <div className="product-footer-row">
          <span className="product-price">{formatVND(product.price)}</span>

          <button
            type="button"
            className="product-add-btn"
            onClick={handleAdd}
            title={`Thêm ${product.name} vào giỏ`}
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
          >
            {inCartQty > 0 ? (
              <span className="product-add-badge">{inCartQty}</span>
            ) : null}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
