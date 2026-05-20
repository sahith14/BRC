import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Issues } from "@/components/Issues";
import { Reality } from "@/components/Reality";
import { Voices } from "@/components/Voices";
import { ManifestoBlock } from "@/components/Manifesto";
import { Join } from "@/components/Join";
import { Footer } from "@/components/Footer";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const db = await getDB();
  const publishedIssues = db.issues.filter(i => i.published);
  const approvedStories = db.stories.filter(s => s.decision === "Approved");

  return (
    <main className="relative">
      <Nav />
      <Hero content={db.content} />
      <Marquee />
      <Issues issues={publishedIssues} />
      <Reality />
      <Voices stories={approvedStories} />
      <ManifestoBlock content={db.content} />
      <Join memberCount={db.members.length} />
      <Footer />
    </main>
  );
}
