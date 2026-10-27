import { MarketingNav } from "@/components/layout/marketing-nav";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-shell">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-cyan px-5 py-3 text-bg focus:not-sr-only"
      >
        Skip to content
      </a>
      <MarketingNav />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
