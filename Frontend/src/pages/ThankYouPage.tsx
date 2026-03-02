import { useNavigate } from "react-router-dom";
import { CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-7 w-7 text-success" />
        </div>
        <h1 className="text-xl font-bold">Thank you for ordering with Mr. Mutton</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          For further updates of your order, please check your WhatsApp.
        </p>

        <div className="mt-6">
          <Button onClick={() => navigate("/")} className="w-full gap-2">
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ThankYouPage;