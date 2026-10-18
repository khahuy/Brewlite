'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types';

const sizes = [
  { id: 'S', label: 'Nhỏ', extra: 0 },
  { id: 'M', label: 'Vừa', extra: 6000 },
  { id: 'L', label: 'Lớn', extra: 12000 },
] as const;

const toppings = [
  { id: 'white-pearl', label: 'Trân châu trắng', extra: 8000 },
  { id: 'cheese-foam', label: 'Kem cheese macchiato', extra: 10000 },
] as const;

const iceLevels = [
  { id: 'none', label: 'Không đá' },
  { id: 'less', label: 'Ít đá' },
  { id: 'full', label: 'Đá đầy' },
] as const;

interface ProductOptionsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (size: string, price: number) => void;
}

export default function ProductOptions({
  product,
  onClose,
  onAddToCart,
}: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] =
    useState<(typeof sizes)[number]['id']>('M');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedIce, setSelectedIce] =
    useState<(typeof iceLevels)[number]['id']>('full');

  useEffect(() => {
    if (!product) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose, product]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;

    const sizeExtra = sizes.find((size) => size.id === selectedSize)?.extra ?? 0;
    const toppingsExtra = toppings
      .filter((topping) => selectedToppings.includes(topping.id))
      .reduce((total, topping) => total + topping.extra, 0);

    return product.price + sizeExtra + toppingsExtra;
  }, [product, selectedSize, selectedToppings]);

  if (!product) return null;

  const toggleTopping = (id: string) => {
    setSelectedToppings((current) =>
      current.includes(id)
        ? current.filter((toppingId) => toppingId !== id)
        : [...current, id],
    );
  };

  const addCustomizedProduct = () => {
    const sizeLabel = sizes.find((size) => size.id === selectedSize)?.label;
    const iceLabel = iceLevels.find((ice) => ice.id === selectedIce)?.label;
    const toppingLabels = toppings
      .filter((topping) => selectedToppings.includes(topping.id))
      .map((topping) => topping.label);
    const customization = [
      `Size ${sizeLabel ?? selectedSize}`,
      iceLabel,
      ...toppingLabels,
    ]
      .filter(Boolean)
      .join(' · ');

    onAddToCart(customization, totalPrice);
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="options-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-options-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Đóng chi tiết sản phẩm"
        >
          ×
        </button>

        <div className="options-modal__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} />
        </div>

        <div className="options-modal__content">
          <div className="options-heading">
            <div>
              <p className="eyebrow">{product.category}</p>
              <h2 id="product-options-title">{product.name}</h2>
            </div>
            <strong className="options-price">
              {totalPrice.toLocaleString('vi-VN')}đ
            </strong>
          </div>
          <p className="options-description">{product.description}</p>

          <fieldset className="option-section">
            <legend>Kích cỡ</legend>
            <div className="size-options">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size.id}
                  className={`size-option${selectedSize === size.id ? ' is-selected' : ''}`}
                  onClick={() => setSelectedSize(size.id)}
                  aria-pressed={selectedSize === size.id}
                >
                  <strong>{size.id}</strong>
                  <span>{size.label}</span>
                  {size.extra > 0 ? (
                    <small>+{size.extra.toLocaleString('vi-VN')}đ</small>
                  ) : null}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="option-section">
            <legend>Topping</legend>
            <div className="topping-options">
              {toppings.map((topping) => {
                const checked = selectedToppings.includes(topping.id);
                return (
                  <label className="topping-option" key={topping.id}>
                    <span className="topping-option__name">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTopping(topping.id)}
                      />
                      {topping.label}
                    </span>
                    <span>+{topping.extra.toLocaleString('vi-VN')}đ</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="option-section">
            <legend>Mức đá</legend>
            <div className="ice-options">
              {iceLevels.map((ice) => (
                <button
                  type="button"
                  key={ice.id}
                  className={`ice-option${selectedIce === ice.id ? ' is-selected' : ''}`}
                  onClick={() => setSelectedIce(ice.id)}
                  aria-pressed={selectedIce === ice.id}
                >
                  {ice.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            className="add-to-cart-button"
            onClick={addCustomizedProduct}
          >
            Thêm vào giỏ hàng · {totalPrice.toLocaleString('vi-VN')}đ
          </button>
        </div>
      </section>
    </div>
  );
}
