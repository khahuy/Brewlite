'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

function formatVND(amount: number) {
  return amount.toLocaleString('vi-VN') + 'đ';
}

export default function CheckoutPage() {
  const { items, totalPrice, subtotal, discount, promoCode } = useCart();

  return (
    <main className="page">
      <div className="section-title">
        <h2>Thanh toán đơn hàng</h2>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>Chưa có món nào để thanh toán</h3>
          <p>Vui lòng thêm sản phẩm vào giỏ hàng trước.</p>
          <Link href="/" className="cart-explore-btn" style={{ display: 'inline-block', marginTop: 16 }}>
            Quay lại Menu →
          </Link>
        </div>
      ) : (
        <div className="checkout-card" style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 20, padding: 24, border: '1px solid var(--cream-dark)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Danh sách món ({items.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--espresso-muted)' }}>{item.size || 'Size Vừa'} × {item.quantity}</p>
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--caramel)' }}>{formatVND(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span>Tạm tính</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            {discount > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#16a34a' }}>
                <span>Giảm giá ({promoCode})</span>
                <span>-{formatVND(discount)}</span>
              </div>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span>Phí vận chuyển</span>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>Miễn phí</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, marginTop: 8, paddingTop: 12, borderTop: '1px dashed var(--cream-dark)' }}>
              <span>Tổng thanh toán</span>
              <span style={{ color: 'var(--caramel)' }}>{formatVND(totalPrice)}</span>
            </div>
          </div>

          <button
            type="button"
            className="cart-checkout-btn"
            style={{ width: '100%', marginTop: 24, justifyContent: 'center' }}
            onClick={() => alert('Chức năng thanh toán đang được kết nối với cổng thanh toán!')}
          >
            Xác nhận đặt hàng · {formatVND(totalPrice)}
          </button>
        </div>
      )}
    </main>
  );
}
