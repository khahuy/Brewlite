'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductOptions from '@/components/ProductOptions';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useCart } from '@/context/CartContext';
import { fetchProducts } from '@/services/api';
import type { Product } from '@/types';

const CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'traditional', label: 'Cà phê' },
  { id: 'coldbrew', label: 'Cold Brew & Espresso' },
  { id: 'fruittea', label: 'Trà trái cây' },
  { id: 'pastry', label: 'Bánh ngọt' },
];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

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
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('vi');

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        `${product.name} ${product.description ?? ''} ${product.category ?? ''}`
          .toLocaleLowerCase('vi')
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, searchTerm]);

  const handleAddToCart = (size: string, price: number) => {
    if (!selectedProduct) return;
    addItem(selectedProduct, size, price);
    setSelectedProduct(null);
  };

  return (
    <div className="menu-preview">
      <main>
        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow">HÔM NAY TẠI BREWLITE</p>
            <h1>
              Mỗi ly cà phê,
              <br />
              <span>một khoảnh khắc.</span>
            </h1>
            <p className="hero__description">
              Nguyên liệu chọn lọc, pha chế bằng cả sự tận tâm.
            </p>
            <a href="#menu" className="hero__link">
              Khám phá thực đơn <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero__art" aria-hidden="true">
            <div className="hero__sun" />
            <div className="hero__cup">
              <div className="hero__coffee" />
              <div className="hero__steam hero__steam--one" />
              <div className="hero__steam hero__steam--two" />
              <div className="hero__handle" />
            </div>
            <div className="hero__saucer" />
            <span className="hero__sparkle hero__sparkle--one">✳</span>
            <span className="hero__sparkle hero__sparkle--two">✦</span>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="menu-heading">
            <div>
              <p className="eyebrow">Pha mới mỗi ngày</p>
              <h2>Thực đơn hôm nay</h2>
            </div>
            {!loading && !error ? (
              <p className="menu-heading__count">
                {filteredProducts.length} món ngon đang chờ bạn
              </p>
            ) : null}
          </div>

          <div className="menu-controls">
            <div className="category-tabs" aria-label="Lọc theo danh mục">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`category-tab${activeCategory === category.id ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Tìm món bạn thích..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Tìm món trong thực đơn"
              />
            </label>
          </div>

          {loading ? <LoadingSkeleton /> : null}

          {!loading && error ? (
            <div className="error-state" role="alert">
              <h3>Không tải được menu</h3>
              <p>{error}</p>
              <p className="error-help">
                Kiểm tra backend đang chạy tại{' '}
                {process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}
              </p>
            </div>
          ) : null}

          {!loading && !error && filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badge={product.badge ?? (index === 0 ? 'BÁN CHẠY' : undefined)}
                  isFavorite={product.isFavorite ?? [0, 1, 3].includes(index)}
                  onOpenOptions={setSelectedProduct}
                />
              ))}
            </div>
          ) : null}

          {!loading && !error && filteredProducts.length === 0 ? (
            <div className="empty-state">
              <span aria-hidden="true">☕</span>
              <h3>Chưa tìm thấy món phù hợp</h3>
              <p>Thử từ khóa khác hoặc chọn một danh mục khác nhé.</p>
              <button
                type="button"
                className="reset-filter"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Xem toàn bộ thực đơn
              </button>
            </div>
          ) : null}
        </section>
      </main>

      <footer className="site-footer">
        <Link className="brand brand--footer" href="/">
          Brew<span>Lite</span>
        </Link>
        <p>Được pha bằng sự tử tế, dành riêng cho khoảnh khắc của bạn.</p>
        <span>© 2026 BrewLite</span>
      </footer>

      <ProductOptions
        key={selectedProduct?.id ?? 'closed'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
