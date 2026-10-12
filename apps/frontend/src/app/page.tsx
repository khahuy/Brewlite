'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchProducts } from '@/services/api';
import type { Product } from '@/types';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'traditional', label: 'Cà phê truyền thống' },
  { id: 'coldbrew', label: 'Cold Brew & Espresso' },
  { id: 'fruittea', label: 'Trà trái cây' },
  { id: 'pastry', label: 'Bánh ngọt' },
];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Không tải được menu');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Determine badge for item based on index/id
  const getBadge = (product: Product, index: number): 'BÁN CHẠY' | 'MỚI' | undefined => {
    if (index === 0) return 'BÁN CHẠY';
    if (index === 2 || index === 4) return 'MỚI';
    return undefined;
  };

  return (
    <main className="page">
      {/* Hero Banner matching Figma */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="sparkle-icon">✦</span> HÔM NAY TẠI BREWLITE
          </p>
          <h1>
            Mỗi ly cà phê,
            <br />
            <span>một khoảnh khắc.</span>
          </h1>
          <p className="hero-slogan">Cashierless · Cashless · Cà phê thật ngon</p>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <span className="stat-number">{products.length || 6}</span>
            <span className="stat-label">MÓN MỚI</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-card">
            <span className="stat-number">0đ</span>
            <span className="stat-label">PHÍ GIAO VẬN</span>
          </div>
        </div>
      </section>

      {/* Search Input matching Figma */}
      <div className="search-bar-wrap">
        <div className="search-bar-inner">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm cà phê, trà, bánh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {/* Categories Filter matching Figma */}
      <div className="categories-pill-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <div className="section-title">
        <h2>Thực đơn hôm nay</h2>
        {!loading && !error ? (
          <span className="count">({filteredProducts.length})</span>
        ) : null}
      </div>

      {loading ? <LoadingSkeleton /> : null}

      {!loading && error ? (
        <div className="error-state">
          <h3>Không tải được menu</h3>
          <p>{error}</p>
          <p style={{ marginTop: 8, fontSize: 13 }}>
            Kiểm tra backend đang chạy tại{' '}
            {process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}
          </p>
        </div>
      ) : null}

      {!loading && !error && filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>Không tìm thấy món phù hợp</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
        </div>
      ) : null}

      {!loading && !error && filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={getBadge(product, idx)}
              isFavorite={idx === 0 || idx === 1 || idx === 3}
            />
          ))}
        </div>
      ) : null}
    </main>
  );
}
