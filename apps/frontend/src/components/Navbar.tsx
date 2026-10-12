'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalCount, openCart } = useCart();
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link href="/" className="brand">
          <span className="brand-icon">☕</span>
          Brew<span className="brand-accent">Lite</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link
            href="/"
            className={`nav-link-pill ${pathname === '/' ? 'active' : ''}`}
          >
            Trang chủ
          </Link>
          <Link
            href="/"
            className={`nav-link-pill ${pathname === '/menu' ? 'active' : ''}`}
          >
            Menu
          </Link>
          <Link href="/orders" className="nav-link-pill has-badge">
            Lịch sử
            <span className="nav-pulse-dot" />
          </Link>
          <Link
            href="/account"
            className={`nav-link-pill ${pathname === '/account' ? 'active' : ''}`}
          >
            Tài khoản
          </Link>
        </nav>

        {/* Cart button */}
        <button
          type="button"
          onClick={openCart}
          className="navbar-cart-btn"
          aria-label={`Giỏ hàng có ${totalCount} món`}
        >
          <svg
            className="navbar-cart-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span className="navbar-cart-text">Giỏ hàng</span>
          {totalCount > 0 ? (
            <span className="navbar-cart-badge">{totalCount}</span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
