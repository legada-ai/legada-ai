import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "LEGADA — Liga Acadêmica de IA & Software",
  description:
    "Liga acadêmica da Unimontes dedicada a pesquisa, desenvolvimento e inovação em software com IA generativa aplicada ao mercado e à sociedade.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
