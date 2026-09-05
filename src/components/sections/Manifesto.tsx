"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const lines = root.current.querySelectorAll(".manifesto__line");
    const ctx = gsap.context(() => {
      lines.forEach((line) => gsap.fromTo(line, { opacity: 0.12, y: 30 }, {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: line, start: "top 70%", end: "top 45%", scrub: true },
      }));
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="manifesto" data-scene="collapse">
      <div className="manifesto__inner section-shell">
        <p className="manifesto__line">Nós estudamos o futuro.</p>
        <p className="manifesto__line">Mas estudar não basta.</p>
        <p className="manifesto__line">É preciso construí-lo.</p>
        <h2 className="manifesto__line">LEGADA<span>.</span></h2>
      </div>
    </section>
  );
}
