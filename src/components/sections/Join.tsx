import { SectionLabel } from "@/components/ui/SectionLabel";
import { ClipboardList, ScanSearch, Sparkles } from "lucide-react";

export function Join() {
  return (
    <section id="ingresso" className="section-shell join" data-scene="mark">
      <div className="join__copy">
        <SectionLabel>06 / COMO INGRESSAR</SectionLabel>
        <h2>Seu próximo projeto pode começar aqui.</h2>
        <p>Novos membros ingressam na LEGADA por meio de processo seletivo periódico composto por inscrição e teste.</p>
        <button className="button button--solid" type="button" disabled>Processo seletivo em breve</button>
      </div>
      <div className="join__flow">
        <div><span>01</span><h3><ClipboardList size={22} /> Inscrição</h3><p>Envie seus dados, área de interesse e motivação.</p></div>
        <i />
        <div><span>02</span><h3><ScanSearch size={22} /> Teste</h3><p>Uma avaliação curta para conhecer sua forma de pensar e construir.</p></div>
        <i />
        <div className="join__destination"><span>03</span><h3><Sparkles size={22} /> LEGADA</h3><p>Pesquisa, engenharia e inovação em conjunto.</p></div>
      </div>
    </section>
  );
}
