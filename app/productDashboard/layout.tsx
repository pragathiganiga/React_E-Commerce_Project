import { Suspense } from 'react';
import Loading from './loading';
export const metadata = {
  title: 'Product Dashboard',
  description: 'Manage and view your products efficiently.',
};

export default function ProductDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
