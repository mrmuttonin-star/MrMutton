import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import ScrollToTop from "./components/ScrollToTop";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ReviewsPage from "./pages/ReviewsPage";
import NotFound from "./pages/NotFound";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicyPage from "./pages/privacy-policy";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import MobileBottomNav from "./components/MobileBottomNav";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";

const ScrollUnlocker = () => {
  const location = useLocation();

  useEffect(() => {
    // Safety: avoid the app getting stuck with scroll disabled (e.g. after closing overlays/drawers)
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [location.pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollUnlocker />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/menu/:categoryId" element={<MenuPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <MobileBottomNav />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
