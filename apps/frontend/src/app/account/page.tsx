'use client';

import React from 'react';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <main className="page">
      <div className="section-title">
        <h2>Tài khoản & Thành viên</h2>
      </div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid var(--border)', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--cream)', color: 'var(--caramel)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>
          👤
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: 8, color: 'var(--espresso)' }}>Khách vãng lai</h3>
        <p style={{ color: 'var(--espresso-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
          Đăng nhập để tích điểm BrewPoints và nhận nhiều ưu đãi độc quyền.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/login" className="cart-explore-btn" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
            Đăng nhập
          </Link>
          <Link href="/" style={{ border: '1px solid var(--border)', borderRadius: 9999, padding: '10px 20px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--espresso)' }}>
            Về Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
