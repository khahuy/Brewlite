'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchProducts } from '@/services/api';
import type { Product } from '@/types';

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <main className="page">
      <section className="hero">
        <p className="hero-eyebrow">Hôm nay tại BrewLite</p>
        <h1>
          Mỗi ly cà phê,
          <br />
          <span>một khoảnh khắc.</span>
        </h1>
        <p>Cashierless · Cashless · Cà phê thật ngon</p>
      </section>

      <div className="section-title">
        <h2>Thực đơn hôm nay</h2>
        {!loading && !error ? (
          <span className="count">({products.length})</span>
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

      {!loading && !error && products.length === 0 ? (
        <div className="empty-state">
          <h3>Menu đang trống</h3>
          <p>Chưa có sản phẩm nào. Hãy seed dữ liệu hoặc thêm món trên backend.</p>
        </div>
      ) : null}

      {!loading && !error && products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
