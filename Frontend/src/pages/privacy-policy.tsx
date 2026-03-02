import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Users, Cookie, FileText, Link2, RefreshCw, Mail } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Introduction",
    content: (
      <p>Welcome to Mr. Mutton ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or place an order with us.</p>
    ),
  },
  {
    icon: Eye,
    title: "2. Information We Collect",
    content: (
      <>
        <p className="mb-3">We may collect the following types of information:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span><strong>Personal Information:</strong> Name, email address, phone number, delivery address.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span><strong>Order Information:</strong> Items ordered, order history, payment details.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span><strong>Account Information:</strong> Login credentials and profile preferences.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span><strong>Usage Data:</strong> Pages visited, time spent on the site, browser type, and device information.</span></li>
        </ul>
      </>
    ),
  },
  {
    icon: Users,
    title: "3. How We Use Your Information",
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>To process and deliver your orders.</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>To create and manage your account.</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>To communicate with you regarding orders, offers, and updates.</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>To improve our website, products, and services.</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>To comply with legal obligations.</span></li>
      </ul>
    ),
  },
  {
    icon: Shield,
    title: "4. Sharing of Information",
    content: (
      <>
        <p className="mb-3">We do not sell your personal information. We may share your data with:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>Delivery partners to fulfill your orders.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>Payment processors for secure transactions.</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>Legal authorities when required by law.</span></li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "5. Data Security",
    content: (
      <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
    ),
  },
  {
    icon: Cookie,
    title: "6. Cookies",
    content: (
      <p>We may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.</p>
    ),
  },
  {
    icon: FileText,
    title: "7. Your Rights",
    content: (
      <ul className="space-y-2">
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>Access, update, or delete your personal data.</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>Opt out of marketing communications.</span></li>
        <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" /><span>Request a copy of your data.</span></li>
      </ul>
    ),
  },
  {
    icon: Link2,
    title: "8. Third-Party Links",
    content: (
      <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites.</p>
    ),
  },
  {
    icon: RefreshCw,
    title: "9. Changes to This Policy",
    content: (
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
    ),
  },
  {
    icon: Mail,
    title: "10. Contact Us",
    content: (
      <p>If you have any questions about this Privacy Policy, please contact us via WhatsApp or through our website.</p>
    ),
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <div className="bg-primary/10 pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-5">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-[Poppins] text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm font-[Poppins]">Last updated: February 10, 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <section
                key={index}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-semibold font-[Poppins] text-foreground mb-3">{section.title}</h2>
                    <div className="text-muted-foreground font-[Poppins] text-[15px] leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
