import type { Product } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  return res.json();
}
