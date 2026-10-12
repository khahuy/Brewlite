export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>Đang phát triển: Chi tiết sản phẩm #{id}</div>;
}
