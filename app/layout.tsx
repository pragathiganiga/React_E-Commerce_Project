import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Navbar from "./components/Navbar"; // Import Navbar component
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Decide if the login button should be hidden based on the current page.
  const hideLoginButton = false; // Set this based on your requirement

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {/* Pass hideLoginButton as a prop */}
            <Navbar hideLoginButton={hideLoginButton} />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
