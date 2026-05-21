import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EducationRealityPage } from "@/components/EducationRealityPage";

export const metadata = {
  title: "Education Reality",
  description:
    "BRC Education Reality — they paid for dreams, not degrees. National statistics, state-level breakdown, what happens after graduation, and real student voices."
};

export default function EducationReality() {
  return (
    <main className="relative bg-black">
      <Nav />
      <EducationRealityPage />
      <Footer />
    </main>
  );
}
