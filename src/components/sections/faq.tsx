import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How does Vanta work?",
    a: "Vanta runs as a separate process alongside your game and displays information in an external overlay. Modules vary by game. Explore each game's page for the available features.",
  },
  {
    q: "How do I get my license?",
    a: "Choose a plan, create an account and complete your payment. After payment verification, your license and download appear in your dashboard. A setup guide is included with your package.",
  },
  {
    q: "Which systems are supported?",
    a: "Windows 10 and Windows 11, both 64-bit, on Intel or AMD. Check the requirements on your game's page before buying.",
  },
  {
    q: "Which payment methods can I use?",
    a: "Bitcoin, Ethereum, USDT (TRC20), Litecoin and PayPal Friends & Family. After checking out, send your payment and submit the transaction ID for verification.",
  },
  {
    q: "Can I customise the overlay?",
    a: "Yes. Each module can be toggled independently. Adjust filters, render distance and hotkeys to suit your play style. Try the interactive preview above for an illustrative example.",
  },
  {
    q: "What happens after a game update?",
    a: "Check your dashboard for the latest compatible build and update information. Your existing license remains in your account; download an updated version when it becomes available.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="site-container section-space grid gap-12 md:grid-cols-[.8fr_1.2fr]"
    >
      <div>
        <p className="section-label">A little clarity</p>
        <h2 className="section-title">
          Good questions.
          <br />
          <span className="text-fg-dim">Clear answers.</span>
        </h2>
        <p className="mt-5 max-w-xs text-xs leading-relaxed text-fg-soft">
          The details before you dive in. For more about a specific game,
          explore its product page.
        </p>
        <Link
          href="/games"
          className="mt-6 inline-flex items-center gap-2 text-[11px] text-cyan"
        >
          Explore our games <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className="border-t border-border">
        {faqs.map((faq, i) => (
          <details
            name="questions"
            key={faq.q}
            className="faq-item group border-b border-border"
          >
            <summary className="flex items-center justify-between gap-5 py-5 text-xs font-medium transition-colors hover:text-cyan">
              <span className="flex items-start gap-4">
                <span className="mt-px font-mono text-[9px] text-fg-dim">
                  0{i + 1}
                </span>
                {faq.q}
              </span>
              <Plus
                size={16}
                className="faq-plus shrink-0 text-fg-dim transition-transform"
              />
            </summary>
            <p className="pb-6 pl-7 pr-5 text-[11px] leading-[1.9] text-fg-soft">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
