"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork } from "lucide-react";
import { LegadaMark } from "./LegadaMark";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#top" className="brand" aria-label="LEGADA — Início">
        <LegadaMark size={28} />
        <span>LEGADA</span>
      </a>
      <nav className="nav__links" aria-label="Principal">
        <a href="#objetivo">Objetivo</a>
        <a href="#atividades">Atividades</a>
        <a href="#lideranca">Liderança</a>
        <a href="#ingresso">Ingresso</a>
      </nav>
      <a className="nav__github" href="https://github.com/legada-ai" target="_blank" rel="noreferrer">
        <GitFork size={15} />
        GitHub
        <ArrowUpRight size={14} />
      </a>
    </header>
  );
}
