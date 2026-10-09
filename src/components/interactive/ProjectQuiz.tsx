"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface QuizAnswer {
  goal?: "ecommerce" | "leads" | "authority" | "webapp";
  stage?: "idea" | "ready" | "redesign";
  priority?: "speed" | "design" | "mobile";
}

interface SolutionResult {
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  serviceLink: string;
  contactQuery: string;
}

export function ProjectQuiz() {
  const { isEnglish } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState<QuizAnswer>({});

  const selectAnswer = <K extends keyof QuizAnswer>(
    field: K,
    value: QuizAnswer[K],
    nextStep: 1 | 2 | 3 | 4
  ) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setCurrentQuestion(nextStep);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(1);
  };

  const calculateResult = (): SolutionResult => {
    if (answers.goal === "ecommerce") {
      return isEnglish
        ? {
            title: "Custom E-Commerce & Online Store",
            badge: "Ideal Recommendation",
            description:
              "To sell with confidence and maximize revenue, a modern high-performance e-commerce platform with zero-friction checkout and secure payment integrations is the best strategy.",
            highlights: [
              "Streamlined single-page checkout without friction",
              "Integrated card, Apple Pay, Google Pay & local payments",
              "Intuitive backend dashboard for orders and inventory",
              "Ultra-fast architecture driving sustained conversions",
            ],
            serviceLink: "/servicos#lojas-online",
            contactQuery: "loja-online",
          }
        : {
            title: "Loja Online / E-Commerce Sob Medida",
            badge: "Recomendação Ideal",
            description:
              "Para vender com segurança e maximizar receitas, a melhor estratégia é uma plataforma e-commerce moderna com checkout otimizado e integração direta com MB WAY, Multibanco e cartões.",
            highlights: [
              "Checkout em 1 página sem atrito",
              "Pagamentos por MB WAY, Multibanco e Stripe",
              "Painel intuitivo para gerir produtos e encomendas",
              "Arquitetura rápida e segura para conversões contínuas",
            ],
            serviceLink: "/servicos#lojas-online",
            contactQuery: "loja-online",
          };
    }

    if (answers.goal === "leads") {
      return isEnglish
        ? {
            title: "High-Converting Landing Page",
            badge: "Ideal Recommendation",
            description:
              "If your priority is lead generation through paid advertising (Google Ads / Meta), a surgically structured landing page with focused conversion funnels is the most profitable choice.",
            highlights: [
              "Persuasive copywriting and direct call-to-action flow",
              "Sub-second loading speeds maximizing ad budget ROI",
              "Instant WhatsApp and contact form integration",
              "Configured tracking pixels and conversion analytics",
            ],
            serviceLink: "/servicos#landing-pages",
            contactQuery: "landing-page",
          }
        : {
            title: "Landing Page de Alta Conversão",
            badge: "Recomendação Ideal",
            description:
              "Se o foco é captação de clientes em campanhas de marketing (Google Ads / Meta), uma landing page cirurgicamente estruturada para captar contactos é a solução mais eficaz.",
            highlights: [
              "Copywriting persuasivo e foco em ação direta",
              "Carregamento ultra-rápido para maximizar o tráfego de anúncios",
              "Integração com WhatsApp e formulários instantâneos",
              "Pixels de rastreio e conversão configurados",
            ],
            serviceLink: "/servicos#landing-pages",
            contactQuery: "landing-page",
          };
    }

    if (answers.goal === "webapp") {
      return isEnglish
        ? {
            title: "Custom Web Application & Portal",
            badge: "Ideal Recommendation",
            description:
              "To automate manual processes or offer a dedicated client portal, a custom TypeScript web app with secure authentication and modern cloud database is the ultimate solution.",
            highlights: [
              "Private member area with encrypted authentication",
              "Real-time dashboards and interactive analytics",
              "Seamless integration with 3rd-party APIs and CRM",
              "Scalable cloud architecture built to expand",
            ],
            serviceLink: "/servicos#web-apps",
            contactQuery: "web-app",
          }
        : {
            title: "Aplicação Web / Portal Sob Medida",
            badge: "Recomendação Ideal",
            description:
              "Para automatizar operações ou oferecer uma área reservada aos seus clientes, uma aplicação web com TypeScript, autenticação segura e base de dados moderna é a escolha certa.",
            highlights: [
              "Área de utilizadores com login protegido",
              "Dashboards e relatórios em tempo real",
              "Integração com APIs e sistemas externos",
              "Arquitetura escalável na cloud",
            ],
            serviceLink: "/servicos#web-apps",
            contactQuery: "web-app",
          };
    }

    // Default: Website Institucional
    return isEnglish
      ? {
          title: "High-Performance Brand Website",
          badge: "Ideal Recommendation",
          description:
            "Showcase your company with undeniable market authority. An elegant, rapid, and Google-optimized website that turns casual traffic into loyal clientele.",
          highlights: [
            "Exclusive visual design tailored to your brand identity",
            "Full technical search engine optimization (Google SEO)",
            "Flawless responsive experience across mobile & desktop",
            "User-friendly CMS for effortless content updates",
          ],
          serviceLink: "/servicos#websites",
          contactQuery: "site-institucional",
        }
      : {
          title: "Website Institucional de Alta Performance",
          badge: "Recomendação Ideal",
          description:
            "Apresente a sua empresa com autoridade no mercado. Um website elegante, rápido e otimizado para o Google que transforma visitantes em clientes fidelizados.",
          highlights: [
            "Design exclusivo adaptado à sua marca",
            "Otimização completa para motores de busca (Google SEO)",
            "Experiência perfeita em telemóveis e computadores",
            "Painel simples para edição autónoma de conteúdos",
          ],
          serviceLink: "/servicos#websites",
          contactQuery: "site-institucional",
        };
  };

  const result = calculateResult();

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
      {/* Cabeçalho */}
      <div className="max-w-2xl mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-accent">
          {isEnglish ? "Interactive Project Assistant" : "Assistente Interativo de Projeto"}
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
          {isEnglish ? "Find the Ideal Solution for Your Business" : "Descubra a Solução Ideal para o Seu Negócio"}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary">
          {isEnglish
            ? "Answer 3 quick questions to receive a tailored technical roadmap for your goals."
            : "Responda a 3 perguntas rápidas para receber uma recomendação técnica adaptada aos seus objetivos."}
        </p>
      </div>

      {/* Indicador de passos do quiz */}
      {currentQuestion < 4 && (
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentQuestion >= step ? "bg-accent" : "bg-surface-hover"
              }`}
            />
          ))}
          <span className="text-[11px] font-bold text-accent ml-2">
            {currentQuestion}/3
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ==============================================================
            PERGUNTA 1
            ============================================================== */}
        {currentQuestion === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary">
              {isEnglish
                ? "1. What is your primary digital goal right now?"
                : "1. Qual é a sua meta principal na internet neste momento?"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {([
                {
                  id: "authority",
                  title: isEnglish ? "Establish High-Authority Brand Presence" : "Apresentar a Minha Empresa com Autoridade",
                  desc: isEnglish ? "Project utmost credibility to prospective clients and partners." : "Transmitir confiança máxima a novos clientes e parceiros.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 3 7h18l-9-5Z" />
                    </svg>
                  ),
                },
                {
                  id: "leads",
                  title: isEnglish ? "Generate Qualified Leads from Ads" : "Gerar Contactos (Leads) de Publicidade",
                  desc: isEnglish ? "Attract high-intent inquiries via Google and Meta advertising." : "Captar clientes para serviços através de Google ou Meta Ads.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  ),
                },
                {
                  id: "ecommerce",
                  title: isEnglish ? "Sell Products Online 24/7" : "Vender Produtos Online 24/7",
                  desc: isEnglish ? "Modern store with frictionless checkout and catalog management." : "Loja com pagamentos portugueses (MB WAY) e gestão de stock.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  ),
                },
                {
                  id: "webapp",
                  title: isEnglish ? "Automate Workflows with a Web App" : "Automatizar Processos com um Sistema Web",
                  desc: isEnglish ? "Client portals, secure authentication, or internal dashboards." : "Portal de clientes, login reservado ou dashboard interno.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 3v18M3 9h18M3 15h18" />
                    </svg>
                  ),
                },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectAnswer("goal", opt.id, 2)}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-border/80 bg-surface/70 text-left hover:border-accent hover:bg-surface-hover/80 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            PERGUNTA 2
            ============================================================== */}
        {currentQuestion === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary">
                {isEnglish ? "2. Where is your project currently at?" : "2. Em que ponto se encontra o seu projeto?"}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentQuestion(1)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                {isEnglish ? "← Previous question" : "← Pergunta anterior"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {([
                {
                  id: "idea",
                  title: isEnglish ? "I Only Have the Idea" : "Apenas Tenho a Ideia",
                  desc: isEnglish ? "I need end-to-end guidance, including UX architecture and strategy." : "Preciso de acompanhamento do zero, incluindo conselhos de design e estrutura.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6M10 22h4" />
                    </svg>
                  ),
                },
                {
                  id: "ready",
                  title: isEnglish ? "Branding & Content Ready" : "Conteúdos & Marca Prontos",
                  desc: isEnglish ? "I already have brand assets, copywriting, and media ready to launch." : "Já possuo logotipo, textos e fotografias organizadas para colocar online.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                    </svg>
                  ),
                },
                {
                  id: "redesign",
                  title: isEnglish ? "Existing Site to Overhaul" : "Site Antigo a Renovar",
                  desc: isEnglish ? "I have an existing website that is slow, dated, or underperforming." : "Já tenho um site, mas está desatualizado, lento ou não gera resultados.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                      <path d="M16 16h5v5" />
                    </svg>
                  ),
                },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectAnswer("stage", opt.id, 3)}
                  className="flex flex-col p-4 rounded-2xl border border-border/80 bg-surface/70 text-left hover:border-accent hover:bg-surface-hover/80 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors mb-3">
                    {opt.icon}
                  </div>
                  <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            PERGUNTA 3
            ============================================================== */}
        {currentQuestion === 3 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary">
                {isEnglish ? "3. What do you value most in the final delivery?" : "3. O que mais valoriza na entrega final?"}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentQuestion(2)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                {isEnglish ? "← Previous question" : "← Pergunta anterior"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {([
                {
                  id: "speed",
                  title: isEnglish ? "Speed & Google SEO" : "Velocidade & Google SEO",
                  desc: isEnglish ? "Instant load times engineered to rank at the top of Google searches." : "Carregamento instantâneo para conquistar o topo das pesquisas do Google.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                },
                {
                  id: "design",
                  title: isEnglish ? "Prestige Design & Wow Factor" : "Design de Prestígio & Efeito Uau",
                  desc: isEnglish ? "Sleek micro-interactions and refined aesthetics that leave a lasting mark." : "Animações modernas e identidade visual sofisticada que marque os clientes.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  ),
                },
                {
                  id: "mobile",
                  title: isEnglish ? "Mobile First & Zero Friction" : "Mobile First & Zero Complicações",
                  desc: isEnglish ? "Seamless smartphone experience and effortless inquiry flows." : "Facilidade de navegação em telemóveis e processos de contacto diretos.",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  ),
                },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectAnswer("priority", opt.id, 4)}
                  className="flex flex-col p-4 rounded-2xl border border-border/80 bg-surface/70 text-left hover:border-accent hover:bg-surface-hover/80 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors mb-3">
                    {opt.icon}
                  </div>
                  <h4 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            RESULTADO FINAL
            ============================================================== */}
        {currentQuestion === 4 && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-accent/40 bg-gradient-to-br from-surface to-accent-subtle/30 p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent-subtle">
                  {result.badge}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-2">
                  {result.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={resetQuiz}
                className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                <span>↺</span> {isEnglish ? "Retake quiz" : "Fazer novamente"}
              </button>
            </div>

            <p className="text-sm leading-relaxed text-text-secondary">
              {result.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-text-primary">
                {isEnglish ? "What this solution includes for your case:" : "O que esta solução inclui para o seu caso:"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {result.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link href={`/contacto?tipo=${result.contactQuery}`}>
                <Button variant="contact" size="md" withArrow>
                  {isEnglish ? "Discuss This Solution" : "Falar sobre esta Solução"}
                </Button>
              </Link>
              <Link href={result.serviceLink}>
                <Button variant="secondary" size="md">
                  {isEnglish ? "Explore Service Details" : "Ver Detalhes do Serviço"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
