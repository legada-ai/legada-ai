# LEGADA Landing Page

Landing page experimental da **LEGADA**, uma liga acadêmica da Unimontes voltada a pesquisa e desenvolvimento de software com IA generativa aplicada ao mercado e à sociedade.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Estrutura

- `src/components/sections`: conteúdo e narrativa da landing.
- `src/experience`: cena contínua de partículas em React Three Fiber.
- `src/data/content.ts`: conteúdo editável da stack, atividades e liderança.
- `public/leader-*.svg`: mocks temporários das fotos da liderança.

## Fotos da liderança

As fotos de Marcelo e Igor estão em `public/` e os caminhos são definidos em `src/data/content.ts`. As imagens são renderizadas em preto e branco pelo CSS.

## GitHub e formulário

Os links levam à organização `legada-a`. O CTA de processo seletivo permanece em estado “em breve” até a integração do formulário.
