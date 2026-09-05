# SPEC — LEGADA

## 1. Posicionamento

A LEGADA deve se apresentar como um **AI Research Lab + Engineering Collective**, não como um site acadêmico convencional. A interface é independente da identidade visual da Unimontes; a universidade aparece apenas como vínculo institucional.

### Conceito

**Research what’s next. Build what matters.**

### Narrativa

Pesquisa → Experimento → Software → Impacto.

## 2. Identidade

- Fundo: `#050505`
- Texto principal: `#F4F4F0`
- Texto secundário: `#8B8B86`
- Accent controlado: `#C8FF3D`
- Headings: Geist, peso 500–600, tracking negativo.
- UI técnica: Geist Mono.
- Fotos: preto e branco, contraste levemente elevado.

## 3. Símbolo

O símbolo parte de quatro módulos em forma de losango, representando pesquisa, engenharia, inteligência e sociedade. O espaço central contém um `L` reduzido. Um pequeno ponto lime representa o estado ativo/experimental. O mesmo sistema é aproximado em partículas no estado final da cena 3D.

## 4. Cena contínua

A cena é fixa e muda de forma de acordo com a seção visível:

1. `hero`: núcleo neural esférico.
2. `network`: anéis/nós distribuídos.
3. `research`: campo ondulatório.
4. `build`: volume estrutural.
5. `people`: partículas recuam para abrir espaço para retratos.
6. `collapse`: partículas convergem.
7. `mark`: partículas formam a assinatura modular da LEGADA.

A cena deve permanecer decorativa e não bloquear leitura/interação.

## 5. Seções

### Hero
- Headline: “Construímos o que vem depois.”
- Liga + Unimontes contextualizados discretamente.
- CTA primário para objetivo.
- CTA secundário para seleção.
- Cursos envolvidos no rodapé da viewport.

### Campo de estudo
- OpenAI, Anthropic, Gemini.
- LangChain, LangGraph, CrewAI, MCP.
- Claude Code, Codex, Gemini CLI.
- n8n, APIs.
- Linguagem deve sempre indicar exploração/estudo, nunca domínio institucional presumido.

### Objetivo
- Frase principal: “Pesquisamos para construir com ela.”
- Sequência: Pesquisa, Experimento, Software, Impacto.
- Pilares: Pesquisar, Construir, Impactar.
- Cursos: SI, IA, Engenharia de Sistemas, Engenharia Elétrica.

### Atividades
- Pesquisa aplicada.
- Desenvolvimento experimental.
- Encontros semanais.
- Feiras e mostras periódicas.

### Liderança
- Marcelo Oliveira — Presidente — Software Developer.
- Igor Costa — Vice-Presidente — Software Developer.
- Joaquim — Coordenador de Inovação — Researcher.
- Fotos temporárias substituíveis por assets reais.

### Manifesto
- “Nós estudamos o futuro.”
- “Mas estudar não basta.”
- “É preciso construí-lo.”
- “LEGADA.”

### Ingresso
- Etapa 1: inscrição.
- Etapa 2: teste.
- CTA em estado “em breve” até formulário ser integrado.

## 6. Motion

- Entrada do hero via GSAP.
- Seção de objetivo com progressão de opacidade vinculada a scroll.
- Manifesto com reveal progressivo.
- Cena Three.js morfa de maneira contínua entre estados.
- Parallax do cursor muito sutil na cena.
- `prefers-reduced-motion` obrigatório.

## 7. Performance

- DPR máximo de 1.6 na cena.
- ~1800 partículas no desktop.
- Sem texturas grandes.
- Sem pós-processamento pesado na primeira versão.
- Mobile preserva o conceito com a mesma cena, porém sem interações custosas adicionais.

## 8. Próximas tasks

1. Adicionar a foto real de Joaquim.
2. Implementar formulário de inscrição.
3. Criar backend/integração do formulário, se necessário.
4. Adicionar conteúdo de projetos quando existirem.
5. Rodar Lighthouse e ajustar budgets de performance.
6. Refinar o símbolo a partir de feedback visual após primeiro deploy.
