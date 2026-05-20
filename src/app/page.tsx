import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Issues } from "@/components/Issues";
import { Reality } from "@/components/Reality";
import { Voices } from "@/components/Voices";
import { ManifestoBlock } from "@/components/Manifesto";
import { Join } from "@/components/Join";
import { Footer } from "@/components/Footer";
import { ISSUES, VOICES, MEMBERS, MOVEMENT } from "@/lib/data";

// Statically generated. We render from the seed data so the site builds
// without any database, which is required for the GitHub Pages export.
export default function HomePage() {
  const content = {
    heroHeadline: "THE IGNORED",
    heroSubheadline: "Farmers · Students · Workers · Citizens",
    heroAccent: "ARE SPEAKING.",
    manifesto: MOVEMENT.manifesto,
  };

  const publishedIssues = ISSUES.map((i) => ({
    number: i.number,
    slug: i.slug,
    title: i.title,
    description: i.description,
    punch: i.punch,
    demands: i.demands,
    accent: i.accent,
    published: true,
  }));

  const approvedStories = VOICES.map((v) => ({
    id: v.id,
    role: v.role,
    state: v.state,
    story: v.story,
    highlighted: !!v.highlighted,
  }));

  return (
    <main className="relative">
      <Nav />
      <Hero content={content} />
      <Marquee />
      <Issues issues={publishedIssues} />
      <Reality />
      <Voices stories={approvedStories} />
      <ManifestoBlock content={content} />
      <Join memberCount={MEMBERS.length} />
      <Footer />
    </main>
  );
}
