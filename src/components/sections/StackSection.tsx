import { stackGroups } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight, BrainCircuit, TerminalSquare, Workflow, Zap } from "lucide-react";

const groupIcons = [BrainCircuit, Workflow, TerminalSquare, Zap];

export function StackSection() {
  return (
    <section id="stack" className="section-shell stack-section" data-scene="network">
      <div className="section-head">
        <SectionLabel>02 / CAMPO DE ESTUDO</SectionLabel>
        <h2>Exploramos o ecossistema que está redefinindo software.</h2>
      </div>
      <div className="stack-grid">
        {stackGroups.map((group, index) => {
          const Icon = groupIcons[index];
          return (
          <article className="stack-group" key={group.label}>
            <div className="stack-group__head"><Icon size={19} /><span className="stack-group__label">{group.label}</span></div>
            {group.items.map((item) => <div className="stack-item" key={item}>{item}<ArrowUpRight size={14} /></div>)}
          </article>
        )})}
      </div>
    </section>
  );
}
