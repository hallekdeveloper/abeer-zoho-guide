"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/content";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href="/" className="min-w-0 text-white">
          <div className="font-[family-name:var(--font-display)] text-xl">
            Hallek
          </div>
          <div className="text-[11px] tracking-wide text-white/60 uppercase">
            Al Abeer · Zoho implementation
          </div>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={active ? "font-semibold" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/flows" className="btn btn-primary !py-2 text-sm">
          View flows
        </Link>
      </div>

      <div className="wrap flex gap-3 overflow-x-auto pb-3 lg:hidden">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              className="shrink-0 whitespace-nowrap text-sm"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-white">
      <div className="wrap flex flex-col gap-2 py-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <span>
          <strong className="text-[var(--ink)]">Hallek Technologies</strong> ·
          Al Abeer Zoho CRM Plus solution guide
        </span>
        <span>BRD · Questionnaire · Discovery transcript</span>
      </div>
    </footer>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="hero">
      <div className="wrap relative z-10 py-12 md:py-14">
        <h1 className="max-w-3xl text-3xl text-white md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-white/75">{description}</p>
      </div>
    </section>
  );
}
