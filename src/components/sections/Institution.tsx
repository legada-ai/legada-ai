import Image from "next/image";
import { MapPin, University } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Institution() {
  return (
    <section className="campus section-shell" data-scene="research" aria-labelledby="campus-title">
      <div className="campus__frame">
        <Image src="/unimontes2.jpeg" alt="Entrada do campus da Universidade Estadual de Montes Claros" fill sizes="(max-width: 680px) 100vw, 92vw" />
        <div className="campus__grid" aria-hidden="true" />
        <div className="campus__content">
          <SectionLabel>VÍNCULO INSTITUCIONAL</SectionLabel>
          <div>
            <span className="campus__seal"><University size={24} /></span>
            <h2 id="campus-title">Da Unimontes para o que vem depois.</h2>
          </div>
          <div className="campus__location"><MapPin size={15} /><span>Universidade Estadual de Montes Claros · MG</span></div>
        </div>
      </div>
    </section>
  );
}
