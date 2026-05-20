import Link from "next/link";
import { CockroachEmblem } from "./CockroachEmblem";
import { Instagram, Youtube, Twitter, Send, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(220,20,60,0.18),_transparent_60%)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <div className="flex items-center gap-4">
              <CockroachEmblem size={56} />
              <div>
                <div className="font-display text-3xl tracking-wide">BRC</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Bharata Rashtra Cockroaches
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-white/60">
              A cinematic political movement of the ignored. Built by citizens, for citizens. Powered by truth, not budget.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <FooterCol title="Movement">
              <FooterLink href="/manifesto">Manifesto</FooterLink>
              <FooterLink href="/#issues">Issues</FooterLink>
              <FooterLink href="/#reality">Reality</FooterLink>
              <FooterLink href="/#voices">Voices</FooterLink>
            </FooterCol>
            <FooterCol title="Act">
              <FooterLink href="/#join">Join</FooterLink>
              <FooterLink href="/voices/submit">Submit story</FooterLink>
              <FooterLink href="/admin">Admin</FooterLink>
            </FooterCol>
            <FooterCol title="Contact">
              <FooterLink href="mailto:contact@bharatarashtracockroaches.org">
                <span className="inline-flex items-center gap-2"><Mail size={14} /> Email us</span>
              </FooterLink>
              <FooterLink href="#">
                <span className="inline-flex items-center gap-2"><Send size={14} /> Telegram</span>
              </FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-6xl md:text-8xl text-stroke leading-none tracking-tight">
            THE IGNORED ARE SPEAKING.
          </h3>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/40">
          <div className="uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} BRC · A people&apos;s movement
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/baratharashtracockroachs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — @baratharashtracockroachs"
              className="hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </a>
            <Link href="#" aria-label="Twitter" className="hover:text-white transition-colors"><Twitter size={18} /></Link>
            <Link href="#" aria-label="YouTube" className="hover:text-white transition-colors"><Youtube size={18} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">{title}</div>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white/70 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}
