import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DemandsPage } from "@/components/DemandsPage";

export const metadata = {
  title: "People's Demands",
  description:
    "BRC People's Demands — a citizen-powered proposal system. Submit problems, propose reforms, upvote what matters. Your voice can become national policy."
};

export default function Demands() {
  return (
    <main className="relative bg-black">
      <Nav />
      <DemandsPage />
      <Footer />
    </main>
  );
}
