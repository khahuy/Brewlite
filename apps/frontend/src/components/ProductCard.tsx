import type { Product } from '@/types';

function formatVND(amount: number) {
  return amount.toLocaleString('vi-VN') + 'đ';
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        {product.description ? (
          <p className="product-desc">{product.description}</p>
        ) : null}
        <p className="product-price">{formatVND(product.price)}</p>
      </div>
    </article>
  );
}
