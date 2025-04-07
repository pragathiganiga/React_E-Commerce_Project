import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details ',
  description: 'View detailed information about the selected product.',
};

export default function ProductDetailsLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-black min-h-screen">{children}</div>;
}
