import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  MapPin,
  Clock,
  MessageCircle,
  Trash2,
  AlertCircle,
  Navigation,
  Loader2,
  CheckCircle2,
  XCircle,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCart, DeliveryDetails } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { PackageCheck } from "lucide-react";

// Vatika Chowk, Gurugram coordinates
const DELIVERY_CENTER = {
  latitude: 28.4089,
  longitude: 77.0337,
  name: "Vatika Chowk, Gurugram",
};

const DELIVERY_RADIUS_KM = 15;
const DELIVERY_CHARGE_PER_KM = 7;

type NominatimSuggestion = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

// Time slots for lunch and dinner
const LUNCH_SLOTS = [
  "12:00 PM - 12:30 PM",
  "12:30 PM - 1:00 PM",
  "1:00 PM - 1:30 PM",
  "1:30 PM - 2:00 PM",
  "2:00 PM - 2:30 PM",
  "2:30 PM - 3:00 PM",
];

const DINNER_SLOTS = [
  "7:00 PM - 7:30 PM",
  "7:30 PM - 8:00 PM",
  "8:00 PM - 8:30 PM",
  "8:30 PM - 9:00 PM",
  "9:00 PM - 9:30 PM",
  "9:30 PM - 10:00 PM",
];

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getTotalSavings,
    deliveryDetails,
    setDeliveryDetails,
  } = useCart();

  const whatsappNumber = "919220829266";
  const [showErrors, setShowErrors] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimSuggestion[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [showSlotPicker, setShowSlotPicker] = useState(false);
  const { placeOrder } = useCart();

  const isCheckoutDisabled =
    !deliveryDetails.address ||
    !deliveryDetails.isInDeliveryZone ||
    !deliveryDetails.deliveryDay ||
    !deliveryDetails.mealType ||
    !deliveryDetails.timeSlot;

  useEffect(() => {
    const q = locationQuery.trim();
    if (!showLocationDropdown) return;
    if (q.length < 3) {
      setSuggestions([]);
      setIsSuggesting(false);
      return;
    }
    if (q.length > 200) return;

    const controller = new AbortController();
    const t = window.setTimeout(async () => {
      setIsSuggesting(true);
      try {
        // Bounded to NCR region so results stay relevant and reduce "wrong location" matches.
        const viewbox = "76.8,28.8,77.4,27.9"; // left,top,right,bottom
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&addressdetails=1&limit=6&countrycodes=in&viewbox=${viewbox}&bounded=1`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { "accept-language": "en" },
        });
        const data = (await res.json()) as NominatimSuggestion[];
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (e) {
        // ignore aborts
      } finally {
        setIsSuggesting(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
  }, [locationQuery, showLocationDropdown]);

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support location services",
        variant: "destructive",
      });
      return;
    }

    setIsFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;

          // 🔴 Accuracy check
          if (accuracy > 150) {
            toast({
              title: "Low location accuracy",
              description: "Please turn on GPS or move near a window",
              variant: "destructive",
            });
          }

          // 📏 Distance calculation
          const distance = calculateDistance(
            latitude,
            longitude,
            DELIVERY_CENTER.latitude,
            DELIVERY_CENTER.longitude,
          );

          const isInZone = distance <= DELIVERY_RADIUS_KM;

          // 🚫 Sanity check (wrong city / old location)
          if (distance > 20) {
            toast({
              title: "Location mismatch",
              description:
                "Detected location seems incorrect. Please enter address manually.",
              variant: "destructive",
            });
            setIsFetchingLocation(false);
            return;
          }

          // 🌍 Reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                "accept-language": "en",
                "User-Agent": "MrMuttonFoodApp/1.0",
              },
            },
          );

          const data = await response.json();

          // ❌ Address not precise
          if (!latitude || !longitude) {
            toast({
              title: "Location not detected",
              description: "Please enter your area manually",
              variant: "destructive",
            });
            return;
          }

          // ✅ Save address
          setDeliveryDetails((prev) => ({
            ...prev,
            address: data.display_name,
            latitude,
            longitude,
            isInDeliveryZone: isInZone,
          }));

          setShowLocationDropdown(false);

          // 🎉 Zone status toast
          if (isInZone) {
            toast({
              title: "Great news! 🎉",
              description: `You're within our ${DELIVERY_RADIUS_KM}km delivery zone`,
            });
          } else {
            toast({
              title: "Out of delivery zone",
              description: "Your area is out of our delivery zone",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Location fetch error:", error);
          toast({
            title: "Location error",
            description:
              "Failed to detect location. Please enter address manually.",
            variant: "destructive",
          });
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        toast({
          title: "Permission denied",
          description: "Please allow location access or enter address manually",
          variant: "destructive",
        });
        setIsFetchingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const applySelectedLocation = (
    displayName: string,
    latitude: number,
    longitude: number,
  ) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      DELIVERY_CENTER.latitude,
      DELIVERY_CENTER.longitude,
    );

    const isInZone = distance <= DELIVERY_RADIUS_KM;

    setDeliveryDetails((prev) => ({
      ...prev,
      address: displayName,
      latitude,
      longitude,
      isInDeliveryZone: isInZone,
    }));

    setShowLocationDropdown(false);
    setLocationQuery("");
    setSuggestions([]);

    if (isInZone) {
      toast({
        title: "Great news! 🎉",
        description: `You're within our ${DELIVERY_RADIUS_KM}km delivery zone`,
      });
    } else {
      toast({
        title: "Out of delivery zone",
        description: "Your area is out of our delivery zone",
        variant: "destructive",
      });
    }
  };

  const searchManualAddress = async () => {
    const q = locationQuery.trim();
    if (!q) {
      toast({
        title: "Enter an address",
        description: "Please type your delivery address",
        variant: "destructive",
      });
      return;
    }

    // If we already have suggestions, pick the top match on Enter.
    if (suggestions.length > 0) {
      const top = suggestions[0];
      applySelectedLocation(
        top.display_name,
        parseFloat(top.lat),
        parseFloat(top.lon),
      );
      return;
    }

    setIsSuggesting(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&addressdetails=1&limit=1&countrycodes=in`,
        { headers: { "accept-language": "en" } },
      );
      const data = (await response.json()) as NominatimSuggestion[];

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        applySelectedLocation(display_name, parseFloat(lat), parseFloat(lon));
      } else {
        toast({
          title: "Address not found",
          description:
            'Try adding sector/landmark (e.g., "Spaze Plaza, Sector 69 Gurugram")',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleDeliveryChange = (
    field: keyof DeliveryDetails,
    value: string | boolean | number | undefined,
  ) => {
    setDeliveryDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleOrderOnWhatsApp = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart first",
        variant: "destructive",
      });
      return;
    }

    if (
      !deliveryDetails.address ||
      !deliveryDetails.deliveryDay ||
      !deliveryDetails.mealType ||
      !deliveryDetails.timeSlot
    ) {
      setShowErrors(true);
      toast({
        title: "Missing details",
        description: "Please complete all delivery details",
        variant: "destructive",
      });
      return;
    }

    if (deliveryDetails.isInDeliveryZone === false) {
      toast({
        title: "Outside delivery zone",
        description: "Sorry, we can't deliver to your location",
        variant: "destructive",
      });
      return;
    }

    const totalSavings = getTotalSavings();
    const subtotal = getTotalPrice();
    const delivery = deliveryCharge;
    const totalPrice = subtotal + delivery;
    const totalItems = getTotalItems();

    let message = ``;
    message += `*MR. MUTTON*\n`;
    message += `Premium Non-Veg Delights\n`;
    message += `\n`;
    message += `*ORDER SUMMARY*\n`;
    message += `─────────────────\n`;

    items.forEach((item) => {
      message += `\n`;
      message += `*${item.name}*\n`;
      message += `${item.quantity} × Rs ${item.price} = Rs ${item.quantity * item.price}\n`;
    });

    message += `\n─────────────────\n`;
    message += `Items: ${totalItems}\n`;

    if (totalSavings > 0) {
      message += `*You Save: Rs ${totalSavings}*\n`;
    }

    message += `\n`;
    message += `Subtotal: Rs ${subtotal}\n`;
    if (deliveryDetails.latitude != null && deliveryDetails.longitude != null) {
      message += `Delivery Charge: Rs ${delivery} (Rs ${DELIVERY_CHARGE_PER_KM}/km)\n`;
    }
    message += `*TOTAL: Rs ${totalPrice}*\n`;
    message += `\n─────────────────\n`;
    message += `\n`;
    message += `*DELIVERY DETAILS*\n`;
    message += `📍 ${deliveryDetails.address}`;
    if (deliveryDetails.landmark) {
      message += `\nNear: ${deliveryDetails.landmark}`;
    }

    const dayText =
      deliveryDetails.deliveryDay === "today" ? "Today" : "Tomorrow";
    const mealText = deliveryDetails.mealType === "lunch" ? "Lunch" : "Dinner";
    message += `\n⏰ ${dayText} - ${mealText} (${deliveryDetails.timeSlot})`;

    if (deliveryDetails.latitude && deliveryDetails.longitude) {
      message += `\n\n📌 Location: https://maps.google.com/?q=${deliveryDetails.latitude},${deliveryDetails.longitude}`;
    }
    message += `\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );

    clearCart();
    navigate("/thank-you");
    toast({
      title: "Order sent!",
      description: "Your order has been sent to WhatsApp",
    });
  };

  const totalSavings = getTotalSavings();
  const isLocationMissing = showErrors && !deliveryDetails.address;
  const isTimingMissing =
    showErrors &&
    (!deliveryDetails.deliveryDay ||
      !deliveryDetails.mealType ||
      !deliveryDetails.timeSlot);
  const isOutOfZone = deliveryDetails.isInDeliveryZone === false;
  const currentSlots =
    deliveryDetails.mealType === "lunch"
      ? LUNCH_SLOTS
      : deliveryDetails.mealType === "dinner"
        ? DINNER_SLOTS
        : [];

  const distanceKm = useMemo(() => {
    if (deliveryDetails.latitude == null || deliveryDetails.longitude == null)
      return undefined;
    return calculateDistance(
      deliveryDetails.latitude,
      deliveryDetails.longitude,
      DELIVERY_CENTER.latitude,
      DELIVERY_CENTER.longitude,
    );
  }, [deliveryDetails.latitude, deliveryDetails.longitude]);

  const deliveryCharge = useMemo(() => {
    if (distanceKm == null) return 0;
    const kmRounded = Math.max(0, Math.round(distanceKm));
    return kmRounded * DELIVERY_CHARGE_PER_KM;
  }, [distanceKm]);

  const subtotal = getTotalPrice();
  const grandTotal = subtotal + deliveryCharge;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        variant: "destructive",
      });
      return;
    }

    if (isCheckoutDisabled) {
      setShowErrors(true);
      toast({
        title: "Missing delivery details",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    if (isOutOfZone) {
      toast({
        title: "Outside delivery zone",
        description: "We can't deliver to your location",
        variant: "destructive",
      });
      return;
    }

    // ✅ If everything valid → go to checkout
    navigate("/checkout", {
      state: {
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        totalAmount: grandTotal,
        deliveryDate: deliveryDetails.deliveryDay,
        mealType: deliveryDetails.mealType,
        timeSlot: deliveryDetails.timeSlot,
        distance: distanceKm,
        address: deliveryDetails.address,
        latitude: deliveryDetails.latitude,
        longitude: deliveryDetails.longitude,
      },
    });
  };

  console.log("Delivery Details:", deliveryDetails); // 👈 Yaha add karo

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious items to get started!
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90"
            >
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-foreground">
              Your Cart
            </h1>
            <p className="text-xs text-muted-foreground">
              {getTotalItems()} item(s)
            </p>
          </div>
          <button
            onClick={clearCart}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-4 py-4 pb-32">
        {/* Cart Items */}
        <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border/50">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {item.isVeg ? (
                      <div className="w-3 h-3 border-2 border-green-600 rounded-sm flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-3 h-3 border-2 border-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                      </div>
                    )}
                    <h4 className="font-semibold text-foreground text-sm truncate">
                      {item.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-foreground text-sm">
                      ₹{item.price}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-foreground rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-background hover:bg-foreground/80 rounded-l-lg transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-bold text-background min-w-4 text-center text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-background hover:bg-foreground/80 rounded-r-lg transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-bold text-foreground text-sm min-w-[50px] text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Location Section */}
        <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border/50">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
              isLocationMissing
                ? "border-destructive bg-destructive/5"
                : deliveryDetails.address
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${deliveryDetails.address ? "bg-primary/10" : "bg-muted"}`}
              >
                <MapPin
                  className={`h-4 w-4 ${deliveryDetails.address ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">
                  Delivery Location
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                  {deliveryDetails.address || "Enter your delivery address"}
                </p>
              </div>
            </div>
            {showLocationDropdown ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {showLocationDropdown && (
            <div className="mt-3 space-y-3 animate-fade-in">
              {/* Manual Entry with Suggestions */}
              <div className="relative">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Start typing your area / society / sector…"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && searchManualAddress()
                    }
                    className="flex-1 bg-transparent outline-none text-foreground text-sm"
                    autoComplete="off"
                    inputMode="text"
                  />
                  <button
                    type="button"
                    onClick={searchManualAddress}
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                    aria-label="Search address"
                  >
                    {isSuggesting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Suggestions Dropdown - Positioned inside section to prevent overlap */}
                {locationQuery.trim().length >= 3 &&
                  (suggestions.length > 0 || isSuggesting) && (
                    <div className="mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                      <div className="max-h-40 overflow-auto">
                        {isSuggesting && suggestions.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            Searching…
                          </div>
                        ) : (
                          suggestions.map((s) => (
                            <button
                              key={s.place_id}
                              type="button"
                              onClick={() =>
                                applySelectedLocation(
                                  s.display_name,
                                  parseFloat(s.lat),
                                  parseFloat(s.lon),
                                )
                              }
                              className="w-full text-left px-3 py-2 hover:bg-muted transition-colors border-b border-border/50 last:border-b-0"
                            >
                              <div className="text-sm font-medium text-foreground line-clamp-1">
                                {s.display_name.split(",")[0]}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {s.display_name}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Fetch Location Button */}
              <button
                type="button"
                onClick={fetchCurrentLocation}
                disabled={isFetchingLocation}
                className="w-full flex items-center justify-center gap-2 p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isFetchingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="font-medium text-sm">
                      Fetching location...
                    </span>
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    <span className="font-medium text-sm">
                      Use Current Location
                    </span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-muted-foreground text-center">
                Auto-detected location may not be exact. Please verify.
              </p>
            </div>
          )}

          {/* Delivery Zone Status */}
          {deliveryDetails.isInDeliveryZone !== undefined && (
            <div
              className={`mt-3 flex items-center gap-2 p-3 rounded-xl ${
                deliveryDetails.isInDeliveryZone
                  ? "bg-success/10 border border-success/20"
                  : "bg-destructive/10 border border-destructive/20"
              }`}
            >
              {deliveryDetails.isInDeliveryZone ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                  <p className="text-xs text-success font-medium">
                    Your location is in our delivery zone! ✓
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive font-medium">
                    Your area is out of our delivery zone
                  </p>
                </>
              )}
            </div>
          )}

          {/* Landmark */}
          {deliveryDetails.address && deliveryDetails.isInDeliveryZone && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Landmark (optional)"
                value={deliveryDetails.landmark}
                onChange={(e) =>
                  handleDeliveryChange("landmark", e.target.value)
                }
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
              />
            </div>
          )}
        </div>

        {/* Delivery Slot Section */}
        {deliveryDetails.isInDeliveryZone === true && (
          <div className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border/50">
            <button
              onClick={() => setShowSlotPicker(!showSlotPicker)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                isTimingMissing
                  ? "border-destructive bg-destructive/5"
                  : deliveryDetails.timeSlot
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${deliveryDetails.timeSlot ? "bg-primary/10" : "bg-muted"}`}
                >
                  <Clock
                    className={`h-4 w-4 ${deliveryDetails.timeSlot ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">
                    Select Delivery Slot
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {deliveryDetails.timeSlot
                      ? `${deliveryDetails.deliveryDay === "today" ? "Today" : "Tomorrow"} - ${deliveryDetails.mealType === "lunch" ? "Lunch" : "Dinner"} (${deliveryDetails.timeSlot})`
                      : "Choose when to receive your order"}
                  </p>
                </div>
              </div>
              {showSlotPicker ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showSlotPicker && (
              <div className="mt-4 space-y-4 animate-fade-in">
                {/* Day Selection */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Select Day
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        setDeliveryDetails((prev) => ({
                          ...prev,
                          deliveryDay: "today",
                          timeSlot: "",
                        }))
                      }
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        deliveryDetails.deliveryDay === "today"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-gray-200 bg-white text-foreground hover:border-primary/50"
                      }`}
                    >
                      <Calendar className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-sm font-medium">Today</span>
                    </button>
                    <button
                      onClick={() =>
                        setDeliveryDetails((prev) => ({
                          ...prev,
                          deliveryDay: "tomorrow",
                          timeSlot: "",
                        }))
                      }
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        deliveryDetails.deliveryDay === "tomorrow"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-gray-200 bg-white text-foreground hover:border-primary/50"
                      }`}
                    >
                      <Calendar className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-sm font-medium">Tomorrow</span>
                    </button>
                  </div>
                </div>

                {/* Meal Type Selection */}
                {deliveryDetails.deliveryDay && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Select Meal
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() =>
                          setDeliveryDetails((prev) => ({
                            ...prev,
                            mealType: "lunch",
                            timeSlot: "",
                          }))
                        }
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          deliveryDetails.mealType === "lunch"
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-gray-200 bg-white text-foreground hover:border-primary/50"
                        }`}
                      >
                        <span className="text-lg">🍛</span>
                        <span className="text-sm font-medium block">Lunch</span>
                        <span className="text-xs opacity-80">
                          12:00 PM - 3:00 PM
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          setDeliveryDetails((prev) => ({
                            ...prev,
                            mealType: "dinner",
                            timeSlot: "",
                          }))
                        }
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          deliveryDetails.mealType === "dinner"
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-gray-200 bg-white text-foreground hover:border-primary/50"
                        }`}
                      >
                        <span className="text-lg">🍖</span>
                        <span className="text-sm font-medium block">
                          Dinner
                        </span>
                        <span className="text-xs opacity-80">
                          7:00 PM - 10:00 PM
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Time Slot Selection */}
                {deliveryDetails.mealType && currentSlots.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Select Time Slot
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {currentSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleDeliveryChange("timeSlot", slot)}
                          className={`p-2.5 rounded-lg border-2 text-center transition-all text-sm ${
                            deliveryDetails.timeSlot === slot
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : "border-gray-200 bg-white text-foreground hover:border-primary/50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Service Area Info */}
        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl mb-4">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            We deliver within{" "}
            <span className="font-semibold text-foreground">
              {DELIVERY_RADIUS_KM}km
            </span>{" "}
            of {DELIVERY_CENTER.name}
          </p>
        </div>
      </div>

      {/* Spacer to prevent content hiding behind fixed bar */}
      <div className="h-20" />

      {/* Fixed Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-muted-foreground">
                {totalSavings > 0 && (
                  <span className="text-success font-semibold">
                    You Save ₹{totalSavings}
                  </span>
                )}
                {distanceKm != null && (
                  <span>
                    Delivery: ₹{deliveryCharge} ({distanceKm.toFixed(1)} km)
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  Subtotal
                </span>
                <span className="text-xs sm:text-sm font-semibold">
                  ₹{subtotal}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  →
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  Total
                </span>
                <span className="text-sm sm:text-base font-bold">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* <button
              onClick={handleOrderOnWhatsApp}
              disabled={isOutOfZone}
              className={`flex-shrink-0 flex items-center justify-center gap-1.5 h-10 sm:h-11 px-4 sm:px-5 rounded-xl font-bold text-sm transition-colors ${
                isOutOfZone
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-[hsl(142,62%,32%)] text-white hover:bg-[hsl(142,62%,28%)]"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Place Order</span>
            </button> */}

            <button
              onClick={handleCheckout}
              // disabled={isOutOfZone || isCheckoutDisabled}
              className={`flex-shrink-0 flex items-center justify-center gap-1 sm:gap-1.5 h-9 sm:h-11 px-3 sm:px-5 rounded-xl font-bold text-xs sm:text-sm transition-all
    bg-success text-success-foreground
    ${
      isOutOfZone
        ? "opacity-60 cursor-not-allowed pointer-events-none"
        : "hover:bg-success/90"
    }
  `}
            >
              <PackageCheck className="h-5 w-5" />
              <span>Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
