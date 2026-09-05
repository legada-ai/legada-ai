"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Globe2, ScanSearch } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ["Pesquisa.", "Descobrir possibilidades."],
  ["Experimento.", "Transformar hipótese em evidência."],
  ["Software.", "Converter conhecimento em produto."],
  ["Impacto.", "Levar inovação para além do laboratório."],
];

export function Mission() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const items = root.current.querySelectorAll<HTMLElement>(".mission-step");
    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.fromTo(item, { opacity: 0.16 }, {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 58%",
            end: "bottom 42%",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="objetivo" ref={root} className="mission" data-scene="research">
      <div className="mission__sticky section-shell">
        <SectionLabel>03 / OBJETIVO</SectionLabel>
        <div className="mission__intro">
          <p>Não pesquisamos IA apenas para entendê-la.</p>
          <h2>Pesquisamos para construir com ela.</h2>
        </div>
      </div>

      <div className="mission__steps section-shell">
        {steps.map(([title, body], index) => (
          <div className="mission-step" key={title}>
            <span>0{index + 1}</span>
            <div><h3>{title}</h3><p>{body}</p></div>
          </div>
        ))}
      </div>

      <div className="pillars section-shell">
        <article><div className="pillar__head"><span>01</span><ScanSearch size={20} /></div><h3>Pesquisar</h3><p>Experimentar novas aplicações, arquiteturas e abordagens de IA generativa.</p></article>
        <article><div className="pillar__head"><span>02</span><Code2 size={20} /></div><h3>Construir</h3><p>Transformar pesquisa em software, protótipos e produtos.</p></article>
        <article><div className="pillar__head"><span>03</span><Globe2 size={20} /></div><h3>Impactar</h3><p>Levar conhecimento e inovação para universidade, mercado e sociedade.</p></article>
      </div>

      <div className="courses section-shell">
        <SectionLabel>INTERDISCIPLINAR POR NATUREZA</SectionLabel>
        <h3>Quatro áreas. Um mesmo laboratório.</h3>
        <div className="courses__grid">
          <span>Sistemas de Informação</span><i>×</i><span>Inteligência Artificial</span>
          <span>Engenharia de Sistemas</span><i>×</i><span>Engenharia Elétrica</span>
        </div>
      </div>
    </section>
  );
}
