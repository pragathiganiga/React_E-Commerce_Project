"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiUser, FiShoppingBag, FiLogOut, FiMenu, FiX, FiHome } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  hideLoginButton: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hideLoginButton }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { cart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return <div />;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setShowLogoutModal(false);
    setIsOpen(false);

    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    router.push("/");

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const isProductDetailsPage = /^\/productDetails\/\d+$/.test(pathname);
  const showUserOptions = pathname === "/productDashboard" || pathname === "/profile" || isProductDetailsPage || pathname === "/bag";

  return (
    <>
      <nav className="bg-white shadow-md border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            MyApp
          </Link>

          {!hideLoginButton && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8 ml-auto">
                {showUserOptions ? (
                  <>
                    <NavLink href="/productDashboard" label="Home" icon={<FiHome className="mr-2 text-xl" />} />
                    <NavLink href="/profile" label="Profile" icon={<FiUser className="mr-2 text-xl" />} />
                    <NavLink href="/bag" label="Bag" icon={<FiShoppingBag className="mr-2 text-xl" />} >
                      {cart.length > 0 && (
                        <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                          {cart.length}
                        </span>
                      )}
                    </NavLink>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="flex items-center bg-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-700 transition duration-300 text-lg font-medium cursor-pointer"
                    >
                      <FiLogOut className="mr-2 text-xl" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="ml-auto px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition duration-300 text-lg font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button className="md:hidden text-gray-700 text-3xl ml-auto" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4 px-6 z-50">
            <div className="flex flex-col items-center space-y-4">
              {showUserOptions ? (
                <>
                  <NavLink href="/productDashboard" label="Home" icon={<FiHome className="mr-2 text-xl" />} />
                  <NavLink href="/profile" label="Profile" icon={<FiUser className="mr-2 text-xl" />} />
                  <NavLink href="/bag" label="Bag" icon={<FiShoppingBag className="mr-2 text-xl" />} >
                    {cart.length > 0 && (
                      <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                        {cart.length}
                      </span>
                    )}
                  </NavLink>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center bg-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-700 transition duration-300 text-lg font-medium cursor-pointer"
                  >
                    <FiLogOut className="mr-2 text-xl" /> Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition duration-300 text-lg font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Do you want to logout?</h2>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavLink: React.FC<{ href: string; label: string; icon?: React.ReactNode; children?: React.ReactNode }> = ({ href, label, icon, children }) => {
  const pathname = usePathname();
  const active = pathname === href ? "text-pink-600 font-bold" : "text-gray-700 hover:text-pink-600";
  return (
    <Link href={href} className={`flex items-center ${active} text-lg font-medium`}>
      {icon} {label} {children}
    </Link>
  );
};

export default Navbar;
