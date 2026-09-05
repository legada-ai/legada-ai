"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowRight, BrainCircuit, Code2, Microscope, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        y: 42,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.15,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="hero section-shell" data-scene="hero">
      <div className="hero__topline" data-hero-reveal>
        <SectionLabel>RESEARCH / AI / SOFTWARE</SectionLabel>
        <span className="microcopy">UNIMONTES · MONTES CLAROS, MG</span>
      </div>

      <div className="hero__main">
        <div className="hero__copy">
          <div className="hero__eyebrow" data-hero-reveal><Sparkles size={14} /> AI RESEARCH LAB + ENGINEERING COLLECTIVE</div>
          <h1 data-hero-reveal>
            Construímos o que
            <span> vem depois.</span>
          </h1>
          <p data-hero-reveal>
            Pesquisa aplicada e engenharia de software para transformar inteligência artificial em soluções com impacto real.
          </p>
          <div className="hero__actions" data-hero-reveal>
            <a className="button button--solid" href="#objetivo">Conheça a LEGADA <ArrowDown size={15} /></a>
            <a className="button button--ghost" href="#ingresso">Processo seletivo <ArrowRight size={15} /></a>
          </div>
        </div>

        <aside className="hero__signal" data-hero-reveal aria-label="Ciclo de atuação da LEGADA">
          <div className="hero__signal-head">
            <span><BrainCircuit size={22} /></span>
            <small>SISTEMA ATIVO</small>
          </div>
          <div className="hero__signal-row"><Microscope size={17} /><span>Pesquisar</span><strong>01</strong></div>
          <div className="hero__signal-row"><Code2 size={17} /><span>Construir</span><strong>02</strong></div>
          <div className="hero__signal-row"><Sparkles size={17} /><span>Impactar</span><strong>03</strong></div>
          <p>Um laboratório interdisciplinar para testar ideias e entregar software.</p>
        </aside>
      </div>

      <div className="hero__courses" data-hero-reveal>
        <span>Sistemas de Informação</span>
        <span>Inteligência Artificial</span>
        <span>Engenharia de Sistemas</span>
        <span>Engenharia Elétrica</span>
      </div>

      <div className="scroll-cue" data-hero-reveal><span>EXPLORE A LEGADA</span><i /></div>
    </section>
  );
}
