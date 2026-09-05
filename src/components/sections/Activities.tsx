import { activities } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight, Check, Code2, Presentation, ScanSearch, UsersRound } from "lucide-react";

const activityIcons = [UsersRound, ScanSearch, Code2, Presentation];

export function Activities() {
  return (
    <section id="atividades" className="section-shell activities" data-scene="build">
      <div className="section-head section-head--split">
        <div><SectionLabel>04 / ATIVIDADES</SectionLabel><h2>Da conversa técnica à entrega pública.</h2></div>
        <p>Um ciclo contínuo: discutimos um problema, investigamos possibilidades, construímos uma solução e compartilhamos o resultado.</p>
      </div>
      <div className="activity-grid">
        {activities.map((item, index) => {
          const Icon = activityIcons[index];
          return (
            <div className="activity-step" key={item.index}>
              <article className="activity-card">
                <div className="activity-card__head"><Icon size={22} /><span>{item.index}</span></div>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
                <div className="activity-card__output"><Check size={14} /><span>{item.output}</span></div>
              </article>
              {index < activities.length - 1 && <ArrowRight className="activity-step__arrow" size={18} aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
