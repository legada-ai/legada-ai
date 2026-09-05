import { Braces, BrainCircuit, TerminalSquare, type LucideIcon } from "lucide-react";
import {
  siAnthropic,
  siClaude,
  siClaudecode,
  siCrewai,
  siGooglegemini,
  siLangchain,
  siLanggraph,
  siModelcontextprotocol,
  siN8n,
  type SimpleIcon,
} from "simple-icons";

const brandIcons: Record<string, SimpleIcon> = {
  Anthropic: siAnthropic,
  Gemini: siGooglegemini,
  LangChain: siLangchain,
  LangGraph: siLanggraph,
  CrewAI: siCrewai,
  MCP: siModelcontextprotocol,
  "Claude Code": siClaudecode ?? siClaude,
  "Gemini CLI": siGooglegemini,
  n8n: siN8n,
};

const technicalIcons: Record<string, LucideIcon> = {
  OpenAI: BrainCircuit,
  Codex: TerminalSquare,
  APIs: Braces,
};

export function StackLogo({ name }: { name: string }) {
  const brand = brandIcons[name];
  const TechnicalIcon = technicalIcons[name];

  if (brand) {
    return (
      <span className="stack-logo" title={brand.title}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d={brand.path} /></svg>
      </span>
    );
  }

  if (TechnicalIcon) {
    return <span className="stack-logo"><TechnicalIcon size={17} strokeWidth={1.7} /></span>;
  }

  return <span className="stack-logo stack-logo--text">{name.slice(0, 2)}</span>;
}
