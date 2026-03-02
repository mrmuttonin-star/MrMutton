// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";

// const OrderDetailsPage = () => {
//   const { id } = useParams();
//   const { token } = useAuth();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState<any>(null);

//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     if (!token) return;

//     fetch(`${API_URL}/api/orders/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch order");
//         return res.json();
//       })
//       .then((data) => setOrder(data))
//       .catch((err) => console.error(err));
//   }, [id, token]);

//   if (!order) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate(-1)}>Back</button>

//       <h2 className="text-xl font-bold mt-4">Order #{order.id}</h2>
//       <p>Status: {order.status}</p>
//       <p>Total: ₹{order.total_amount}</p>

//       <h3 className="mt-6 font-semibold">Items:</h3>

//       {order.items && order.items.length > 0 ? (
//         order.items.map((item: any) => (
//           <div key={item.id} className="flex justify-between border-b py-2">
//             <span>
//               {item.product_name} x {item.quantity}
//             </span>
//             <span>₹{item.price * item.quantity}</span>
//           </div>
//         ))
//       ) : (
//         <p className="text-muted-foreground">No items found</p>
//       )}
//     </div>
//   );
// };

// export default OrderDetailsPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ChefHat,
} from "lucide-react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => console.error(err));
  }, [id, token]);

  const getStatusConfig = (status: string) => {
    const s = status?.toLowerCase();
    if (s === "delivered")
      return {
        icon: CheckCircle2,
        color: "text-green-600 bg-green-50 border-green-200",
        label: "Delivered",
      };
    if (s === "out for delivery" || s === "shipped")
      return {
        icon: Truck,
        color: "text-blue-600 bg-blue-50 border-blue-200",
        label: status,
      };
    if (s === "preparing" || s === "confirmed")
      return {
        icon: ChefHat,
        color: "text-orange-500 bg-orange-50 border-orange-200",
        label: status,
      };
    return {
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      label: status || "Pending",
    };
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-secondary/30 pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-secondary/30 ">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground font-poppins">
              Order #{order.id}
            </h1>
            <p className="text-xs text-muted-foreground">Order Details</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 pb-10 space-y-4">
        {/* Status Card */}
        <div
          className={`rounded-xl border p-4 flex items-center gap-4 ${statusConfig.color}`}
        >
          <div className="p-3 rounded-full bg-white/60">
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium opacity-70">Order Status</p>
            <p className="text-lg font-bold capitalize">{statusConfig.label}</p>
          </div>
        </div>

        {/* Order Info Card */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-4 space-y-2">
          <h2 className="font-semibold text-sm text-foreground">
            Order Information
          </h2>

          <p className="text-sm text-muted-foreground">
            <strong>Order Date:</strong>{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </p>

          <p className="text-sm text-muted-foreground">
            <strong>Delivery Date:</strong> {order.delivery_date}
          </p>

          <p className="text-sm text-muted-foreground">
            <strong>Meal Type:</strong> {order.meal_type}
          </p>

          <p className="text-sm text-muted-foreground">
            <strong>Time Slot:</strong> {order.time_slot}
          </p>
        </div>
        {/* Order Summary Card */}
        <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="bg-primary/5 border-b border-border/50 px-4 py-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-foreground font-poppins text-sm">
              Order Items
            </h2>
          </div>
          <div className="divide-y divide-border/50">
            {order.items && order.items.length > 0 ? (
              order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {item.quantity}x
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{item.price} each
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-muted-foreground text-sm">No items found</p>
              </div>
            )}
          </div>
        </div>
            {/* Delivery Details Card */}
<div className="bg-card rounded-xl border border-border/50 shadow-sm p-4 space-y-2">
  <h2 className="font-semibold text-sm text-foreground">Delivery Details</h2>

  <p className="text-sm text-muted-foreground">
    <strong>Name:</strong> {order.name}
  </p>

  <p className="text-sm text-muted-foreground">
    <strong>Phone:</strong> {order.phone}
  </p>

  <p className="text-sm text-muted-foreground">
    <strong>Address:</strong> {order.address}, {order.city} - {order.pincode}
  </p>

  {order.instructions && (
    <p className="text-sm text-muted-foreground">
      <strong>Instructions:</strong> {order.instructions}
    </p>
  )}
</div>
        {/* Bill Summary */}
<div className="bg-card rounded-xl border border-border/50 shadow-sm px-4 py-4 space-y-2">

  <div className="flex justify-between text-sm">
    <span>Subtotal</span>
    <span>₹{order.subtotal}</span>
  </div>

  <div className="flex justify-between text-sm">
    <span>Delivery Charge</span>
    <span>₹{order.delivery_charge}</span>
  </div>

  <div className="flex justify-between text-lg font-bold border-t pt-2">
    <span>Total</span>
    <span className="text-primary">₹{order.total_amount}</span>
  </div>

</div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
