export default function LoadingSkeleton() {
  return (
    <div className="product-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="product-card skeleton-card">
          <div className="skeleton skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line price" />
          </div>
        </div>
      ))}
    </div>
  );
}
