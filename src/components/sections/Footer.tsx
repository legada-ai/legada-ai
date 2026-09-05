import { LegadaMark } from "@/components/ui/LegadaMark";
import { ArrowUpRight, GitFork } from "lucide-react";

export function Footer() {
  return (
    <footer id="github" className="footer section-shell">
      <div className="footer__terminal">
        <span>$ legada research</span>
        <p>&gt; experiments<br />&gt; open-source<br />&gt; agents<br />&gt; software<br />&gt; generative-ai</p>
        <a href="https://github.com/legada-ai" target="_blank" rel="noreferrer"><GitFork size={16} /> VER GITHUB <ArrowUpRight size={14} /></a>
      </div>
      <div className="footer__bottom">
        <div className="brand"><LegadaMark size={30} /><span>LEGADA</span></div>
        <p>Liga acadêmica independente · Universidade Estadual de Montes Claros</p>
        <span>2026</span>
      </div>
    </footer>
  );
}
