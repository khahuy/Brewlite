import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrewLite — Đặt cà phê nhanh chóng',
  description: 'Thưởng thức cà phê BrewLite nguyên bản - Cashierless & Cashless',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
