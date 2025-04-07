"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllCarts, getProductDetails } from "../services/cartServices/getAllCarts";
import { deleteCartItem } from "../services/cartServices/deleteCartServices";
import Loading from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  productId: number;
  quantity: number;
  title?: string;
  price?: number;
  image?: string;
  description?: string;
  cartId?: number;
}

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Product[];
}

const BagPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      setLoading(true);
      try {
        const cartsData: Cart[] = await getAllCarts();
        if (cartsData) {
          const allProductIds = cartsData.flatMap(cart =>
            cart.products.map(item => ({ ...item, cartId: cart.id }))
          );

          const uniqueProductIds = [...new Set(allProductIds.map(item => item.productId))];

          const productDetailsPromises = uniqueProductIds.map(productId => getProductDetails(productId));
          const productDetails = await Promise.all(productDetailsPromises);

          const productDetailsMap = uniqueProductIds.reduce((acc, productId, index) => {
            acc[productId] = productDetails[index];
            return acc;
          }, {} as Record<number, Product>);

          const allProducts: Product[] = allProductIds.map(item => ({
            ...item,
            ...productDetailsMap[item.productId],
          }));

          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
      setLoading(false);
    };

    fetchCarts();
  }, []);

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct || !selectedProduct.cartId) return;

    const success = await deleteCartItem(selectedProduct.cartId);
    if (success) {
      setProducts(prevProducts => prevProducts.filter(product => product.cartId !== selectedProduct.cartId));
      
      toast.success("Item successfully removed from the cart! 🛒", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
    setShowConfirm(false);
    setSelectedProduct(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedProduct(null);
  };

  const totalPrice = products.reduce((sum, product) => sum + (product.price ?? 0) * product.quantity, 0);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black-600 p-4 md:p-6 w-full">
      <ToastContainer />

      <button
        onClick={() => router.back()}
        className="mb-6 text-pink-600 hover:text-pink-700 transition flex items-center cursor-pointer font-semibold"
      >
        <span className="mr-2">←</span> Back to Shopping
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6 text-center">Your Shopping Bag</h1>

      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your bag is empty. Start shopping now!</p>
      ) : (
        <div className="max-w-4xl mx-auto w-full bg-white p-4 md:p-6 rounded-lg shadow-md">
          {products.map((product, index) => (
            <div
              key={`${product.productId}-${index}`}
              className="flex flex-col md:flex-row items-center md:items-start justify-between border-b pb-4 mb-4"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 flex justify-center items-center bg-gray-100 rounded-lg shadow-sm">
                {product.image && (
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain rounded-md" />
                )}
              </div>

              <div className="flex-1 px-4 text-center md:text-left">
                <p className="text-gray-900 font-medium text-lg">{product.title}</p>
                <p className="text-gray-600 text-sm">{product.description || "No description available"}</p>
                <p className="text-black text-lg font-semibold mt-2">${product.price}</p>
              </div>

              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex items-center border border-gray-400 rounded-lg">
                  <button className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300">-</button>
                  <span className="px-3 text-black">{product.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300">+</button>
                </div>

                <button
                  onClick={() => handleDeleteClick(product)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition w-full md:w-auto cursor-pointer"
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white text-xl font-semibold py-3 rounded-lg transition-all mt-6">
            Proceed to Checkout
          </button>
        </div>
      )}

      {showConfirm && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Do you want to remove <span className="text-red-500">{selectedProduct.title}</span> from your cart?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Yes, Remove
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagPage;
