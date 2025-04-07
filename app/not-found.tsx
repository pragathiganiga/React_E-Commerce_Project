'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-gray-300 mt-2">Oops! The page you are looking for does not exist.</p>
      <Link
        href="/productDashboard"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition cursor-pointer"
      >
        Go Home
      </Link>
    </div>
  );
}
