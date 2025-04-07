"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSingleProduct } from "../../services/productServices/getSingleProduct";
import { useCart } from "../../context/CartContext"; // Import Cart Context
import Loading from "./loading";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating?: { rate: number };
}

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = Number(params?.id); // Convert ID to number safely

  useEffect(() => {
    if (!productId) {
      router.push("/not-found"); // Redirect if ID is invalid
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getSingleProduct(productId);
        if (!data) {
          router.push("/not-found"); // Redirect if no product found
          return;
        }
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setSuccessMessage("Added to bag successfully!");
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return null; // Avoid rendering empty UI

  return (
    <div className="relative min-h-screen bg-gray-900 flex justify-center items-center">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 text-pink-600 font-medium flex items-center hover:text-pink-800 transition cursor-pointer"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-[300px] h-[300px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{product.title}</h1>

          <div className="flex items-center space-x-1 mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`text-xl ${
                  index < (product.rating?.rate ?? 0) ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-gray-600 ml-2 text-sm">{product.rating?.rate ?? "No Ratings"}</span>
          </div>

          <p className="text-xl font-semibold text-pink-600 mt-4">₹{product.price}</p>
          <p className="text-gray-700 text-sm mt-2">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white px-6 py-2 text-lg rounded-lg shadow-md hover:bg-pink-700 transition cursor-pointer"
            >
              Add to Bag
            </button>
            <button className="border border-pink-600 text-pink-600 px-6 py-2 text-lg rounded-lg shadow-md hover:bg-pink-100 transition cursor-pointer">
              Buy Now
            </button>
          </div>

          {successMessage && (
            <div className="mt-4 text-green-600 font-medium">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
