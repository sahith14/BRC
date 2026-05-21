import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NeedChangePage } from "@/components/NeedChangePage";

export const metadata = {
  title: "Need Change",
  description:
    "BRC Need Change — the manifesto is not closed. The people still write it. Submit reforms that aren't yet in the manifesto. Top-supported proposals become demands."
};

export default function NeedChange() {
  return (
    <main className="relative bg-black">
      <Nav />
      <NeedChangePage />
      <Footer />
    </main>
  );
}
