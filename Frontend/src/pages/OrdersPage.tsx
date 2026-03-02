import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import MobileBottomNav from "@/components/MobileBottomNav";
// import { format } from "date-fns";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  address: string;
  created_at: string;
}

const statusConfig: Record<
  string,
  { icon: typeof Clock; color: string; label: string }
> = {
  pending: { icon: Clock, color: "text-yellow-600", label: "Pending" },
  confirmed: { icon: Package, color: "text-blue-600", label: "Confirmed" },
  preparing: { icon: Package, color: "text-orange-600", label: "Preparing" },
  out_for_delivery: {
    icon: Package,
    color: "text-primary",
    label: "Out for Delivery",
  },
  delivered: { icon: CheckCircle, color: "text-success", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-destructive", label: "Cancelled" },
};

const OrdersPage = () => {
  const { user, loading: authLoading, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

  console.log("USER:", user);
  console.log("TOKEN:", token);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !token) return;

      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Orders fetch failed:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error("Unexpected orders response:", data);
          console.log("Orders API response:", data);

          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || statusConfig.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">My Orders</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No Orders Yet
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              You haven't placed any orders yet.
              <br />
              Start ordering delicious biryani!
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-primary text-primary-foreground"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const config = getStatusConfig(order.status);
              const StatusIcon = config.icon;

              return (
                <div
                  key={order.id}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="bg-background rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
                >
                  {/* Order Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(order.created_at),
                          "MMM d, yyyy 'at' h:mm a",
                        )}
                      </p>
                      <div
                        className={`flex items-center gap-1 ${config.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {config.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      Order #{String(order.id).padStart(5, "0")}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Delivery Address: {order.address}
                    </p>
                  </div>

                  {/* Order Footer */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm font-medium">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{order.total_amount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default OrdersPage;
