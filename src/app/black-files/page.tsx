import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlackFilesPage } from "@/components/BlackFilesPage";

export const metadata = {
  title: "Black Files",
  description:
    "BRC Black Files — investigative archive of broken promises, missing public funds, and unfinished projects. Sourced from public records. Educational, not vigilante."
};

export default function BlackFiles() {
  return (
    <main className="relative bg-black">
      <Nav />
      <BlackFilesPage />
      <Footer />
    </main>
  );
}
