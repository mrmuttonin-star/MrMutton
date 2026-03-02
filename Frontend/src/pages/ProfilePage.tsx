import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit2,
  LogOut,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Package,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import MobileBottomNav from "@/components/MobileBottomNav";

interface UserAddress {
  id: string;
  label: string;
  address: string;
  is_default: boolean;
}

const ProfilePage = () => {
  const { user, signOut, updateProfile, loading, token } = useAuth();

  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setEditName(user.full_name || "");
      setEditPhone(user.phone || "");
    }
  }, [user]);

  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (user && token) {
      // Fetch addresses
      fetch(`${API_URL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.addresses) setAddresses(data.addresses);
        });

      // Fetch order count
      fetch(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setOrderCount(data.length);
          } else if (Array.isArray(data.orders)) {
            setOrderCount(data.orders.length);
          } else {
            setOrderCount(0);
          }
        });
    }
  }, [user, token]);

  const handleSaveProfile = async () => {
    const { error } = await updateProfile({
      full_name: editName,
      phone: editPhone,
    });

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
          <h1 className="text-lg font-semibold">My Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-background mx-4 mt-4 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-lg font-bold">
                {user?.full_name?.charAt(0)?.toUpperCase() ||
                  user.email?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  {user?.full_name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user?.phone && (
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary border-primary"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="p-4 bg-secondary/50 space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full Name"
                className="pl-10 bg-background"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="Phone Number"
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 bg-primary text-primary-foreground"
              >
                Save
              </Button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto text-accent mb-1" />
              <p className="text-xs text-muted-foreground">Loyalty Points</p>
              <p className="text-lg font-bold text-foreground">
                {orderCount * 10}
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <Package className="w-8 h-8 mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-lg font-bold text-foreground">{orderCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-4 mt-4 bg-background rounded-xl shadow-lg overflow-hidden divide-y divide-border">
        <button
          onClick={() => navigate("/orders")}
          className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-primary" />
            <span className="font-medium">My Orders</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        <button
          onClick={() => navigate("/products")}
          className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">Saved Addresses</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Saved Addresses */}
      {addresses.length > 0 && (
        <div className="mx-4 mt-4 bg-background rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Saved Addresses</h3>
          </div>
          <div className="divide-y divide-border">
            {addresses.map((addr) => (
              <div key={addr.id} className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{addr.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {addr.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="mx-4 mt-6">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default ProfilePage;
