'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { getAllProducts } from '../services/productServices/getAllProducts';
import { useCart } from '../context/CartContext'; // ✅ Import Cart Context
import Loading from './loading';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: { rate: number };
}

export default function ProductDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { addToCart, clearCart } = useCart(); // ✅ Use clearCart()
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Runs only when user logs out
  useEffect(() => {
    if (!user) {
      clearCart(); // ✅ Clears cart once when user logs out
      router.replace('/login');
    }
  }, [user]); // ✅ Only depends on user

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      try {
        const data: Product[] = await getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]); // ✅ Runs when user logs in

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="p-6 min-h-screen bg-black">
      <h1 className="text-pink-600 text-3xl font-bold mb-6 text-center">Trending Products</h1>

      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product) => (
            <Link href={`/productDetails/${product.id}`} key={product.id} className="w-full">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-3 flex flex-col items-center relative group h-[380px] w-full cursor-pointer">
                <div className="w-full aspect-[4/5] max-h-48 rounded-lg overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
                </div>
                <div className="mt-3 text-center flex flex-col items-center flex-grow w-full">
                  <h2 className="text-lg font-medium text-black line-clamp-2">{product.title}</h2>
                  <p className="text-lg font-medium text-black mt-2">MRP: ₹{product.price}</p>
                  <div className="flex justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index} className={`text-xl ${index < (product.rating?.rate ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // ✅ Prevents navigation
                      addToCart({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      });
                    }}
                    className="bg-pink-600 text-white px-4 py-2 w-full rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 mt-3 cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  ); 
}
