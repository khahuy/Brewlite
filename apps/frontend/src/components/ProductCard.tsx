'use client';

import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  badge?: string;
  isFavorite?: boolean;
  onOpenOptions: (product: Product) => void;
}

export default function ProductCard({
  product,
  badge,
  isFavorite = false,
  onOpenOptions,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__image-button"
        onClick={() => onOpenOptions(product)}
        aria-label={`Xem chi tiết ${product.name}`}
      >
        <div className="product-card__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="product-card__photo"
            loading="lazy"
          />
          {badge ? <span className="product-badge">{badge}</span> : null}
          {isFavorite ? (
            <span className="favorite-badge">★ Yêu thích</span>
          ) : null}
        </div>
      </button>

      <div className="product-card__body">
        {product.category ? (
          <span className="product-category">{product.category}</span>
        ) : null}
        <h3>{product.name}</h3>
        {product.description ? (
          <p className="product-description">{product.description}</p>
        ) : null}
        <div className="product-card__footer">
          <span className="product-price">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          <button
            type="button"
            className="add-button"
            onClick={() => onOpenOptions(product)}
            aria-label={`Tùy chỉnh ${product.name}`}
          >
            <span className="add-button__label">Tùy chỉnh</span>
            <span className="add-button__icon" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
