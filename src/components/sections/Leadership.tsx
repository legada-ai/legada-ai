import { leaders } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BadgeCheck } from "lucide-react";

export function Leadership() {
  return (
    <section id="lideranca" className="section-shell leadership" data-scene="people">
      <div className="section-head">
        <SectionLabel>05 / LIDERANÇA</SectionLabel>
        <h2>Quem constrói a LEGADA.</h2>
      </div>
      <div className="leaders-grid">
        {leaders.map((leader, index) => (
          <article className="leader" key={leader.name}>
            <div className="leader__image">
              <img src={leader.image} alt={leader.imageAlt} loading="lazy" />
              <span className="leader__hover"><BadgeCheck size={14} /> LIDERANÇA LEGADA</span>
            </div>
            <div className="leader__meta">
              <span>0{index + 1}</span>
              <div><h3>{leader.name}</h3><p>{leader.profession}</p></div>
              <strong>{leader.role}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
