import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Coopérative Agricole Imadaghne — Terroir Marocain Authentique",
  description:
    "Produits de terroir marocains 100% naturels : huile d'argan, miel, amlou, plantes naturelles. Coopérative Agricole Imadaghne.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased overflow-x-hidden">
        <LanguageProvider>
          <Preloader />
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
