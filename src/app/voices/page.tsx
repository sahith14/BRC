import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { VoicesPage } from "@/components/VoicesPage";

export const metadata = {
  title: "Public Voices",
  description:
    "BRC Public Voices — anonymous citizen stories from across India. Education scams, corruption, unemployment, healthcare failures, caste discrimination, farmer struggles. Support what matters."
};

export default function Voices() {
  return (
    <main className="relative bg-black">
      <Nav />
      <VoicesPage />
      <Footer />
    </main>
  );
}
