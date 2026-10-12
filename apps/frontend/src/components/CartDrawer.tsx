'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function formatVND(amount: number) {
  return amount.toLocaleString('vi-VN') + 'đ';
}

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    discount,
    shippingFee,
    totalPrice,
    promoCode,
    promoError,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        aria-label="Giỏ hàng của bạn"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <svg
              className="cart-bag-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h2>
              Giỏ hàng <span>({totalCount})</span>
            </h2>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="cart-empty-body">
            <div className="cart-empty-icon-wrap">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3>Giỏ hàng đang trống</h3>
            <p>Hãy chọn món yêu thích từ thực đơn</p>
            <button
              type="button"
              className="cart-explore-btn"
              onClick={closeCart}
            >
              Khám phá menu ngay →
            </button>
          </div>
        ) : (
          <div className="cart-content-body">
            {/* Items list */}
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-header-row">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => removeItem(item.id)}
                        title="Xóa món"
                        aria-label={`Xóa ${item.name}`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>

                    <p className="cart-item-size">{item.size || 'Size Vừa'}</p>

                    <div className="cart-item-footer-row">
                      <div className="cart-stepper">
                        <button
                          type="button"
                          className="stepper-btn minus"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Giảm số lượng"
                        >
                          -
                        </button>
                        <span className="stepper-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="stepper-btn plus"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Tăng số lượng"
                        >
                          +
                        </button>
                      </div>

                      <span className="cart-item-total">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code input */}
            <div className="cart-promo-section">
              <form onSubmit={handleApplyPromo} className="cart-promo-form">
                <div className="cart-promo-input-wrap">
                  <svg
                    className="promo-tag-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Mã giảm giá (thử: BREW10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="promo-input"
                  />
                </div>
                <button type="submit" className="promo-apply-btn">
                  Áp dụng
                </button>
              </form>

              {promoError ? (
                <p className="promo-message error">{promoError}</p>
              ) : null}

              {promoCode ? (
                <div className="promo-applied-tag">
                  <span>🎉 Đã áp dụng mã {promoCode} (-10%)</span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="promo-remove-tag-btn"
                    title="Gỡ mã"
                  >
                    ✕
                  </button>
                </div>
              ) : null}
            </div>

            {/* Summary card */}
            <div className="cart-summary-card">
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Phí dịch vụ</span>
                <span className="free-text">Miễn phí</span>
              </div>
              {discount > 0 ? (
                <div className="summary-row discount-row">
                  <span>Giảm giá ({promoCode})</span>
                  <span>-{formatVND(discount)}</span>
                </div>
              ) : null}
              <div className="summary-divider" />
              <div className="summary-row total-row">
                <span>Tổng thanh toán</span>
                <span className="total-amount">{formatVND(totalPrice)}</span>
              </div>
            </div>

            {/* Footer Checkout Button */}
            <div className="cart-footer">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="cart-checkout-btn"
              >
                <span>Tiến hành thanh toán</span>
                <span className="checkout-btn-badge">
                  {formatVND(totalPrice)}
                </span>
                <span className="checkout-arrow">→</span>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
