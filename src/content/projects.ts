/* ============================================================
   Projetos publicados — dados partilhados.

   Aqui vivem apenas factos estruturais: nome, categoria, URLs,
   imagens, stack e tags. Toda a copy (incluindo os estudos de caso)
   está em src/content/strings/{pt,en}.ts.

   As oito marcas são fictícias. Os sites estão publicados e foram
   construídos como demonstrações de estúdio; não representam
   clientes reais nem resultados comerciais.
   ============================================================ */

export type ProjectCategory =
  | "institucional"
  | "loja-online"
  | "landing-page"
  | "web-app"
  | "saas";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  liveUrl: string;
  /** Omitted when the repository is private and must not be linked. */
  repoUrl?: string;
  cover: ProjectImage;
  long: ProjectImage;
  /** Short technical tags shown on cards. */
  tags: string[];
  techStack: string[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "torra-lusa",
    name: "Torra Lusa",
    category: "loja-online",
    liveUrl: "https://torra-lusa.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/torra-lusa",
    cover: { src: "/projetos/torra-lusa/cover.webp", width: 960, height: 600 },
    long: { src: "/projetos/torra-lusa/long.webp", width: 960, height: 5227 },
    tags: ["HTML", "CSS", "JavaScript", "E-commerce"],
    techStack: ["HTML", "CSS", "JavaScript (ES modules)", "Vercel"],
    featured: true,
  },
  {
    slug: "cota-zero",
    name: "Cota Zero",
    category: "institucional",
    liveUrl: "https://cota-zero.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/cota-zero",
    cover: { src: "/projetos/cota-zero/cover.webp", width: 960, height: 600 },
    long: { src: "/projetos/cota-zero/long.webp", width: 960, height: 4213 },
    tags: ["HTML", "CSS", "JavaScript", "SVG"],
    techStack: ["HTML", "CSS", "JavaScript (ES modules)", "SVG", "Vercel"],
    featured: true,
  },
  {
    slug: "mendes-valadares",
    name: "Mendes Valadares",
    category: "institucional",
    liveUrl: "https://mendes-valadares.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/mendes-valadares-site",
    cover: {
      src: "/projetos/mendes-valadares/cover.webp",
      width: 960,
      height: 600,
    },
    long: {
      src: "/projetos/mendes-valadares/long.webp",
      width: 960,
      height: 5225,
    },
    tags: ["HTML", "CSS", "JavaScript", "Acessibilidade"],
    techStack: ["HTML", "CSS", "JavaScript (ES modules)", "Vercel"],
    featured: false,
  },
  {
    slug: "barbearia-sete-colinas",
    name: "Barbearia Sete Colinas",
    category: "landing-page",
    liveUrl: "https://barbearia-sete-colinas.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/barbearia-sete-colinas",
    cover: {
      src: "/projetos/barbearia-sete-colinas/cover.webp",
      width: 960,
      height: 600,
    },
    long: {
      src: "/projetos/barbearia-sete-colinas/long.webp",
      width: 960,
      height: 6655,
    },
    tags: ["HTML", "CSS", "JavaScript", "Formulários"],
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
    featured: false,
  },
  {
    slug: "lumina",
    name: "Lumina",
    category: "institucional",
    liveUrl: "https://lumina-restaurant-nine.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/lumina-restaurant",
    cover: { src: "/projetos/lumina/cover.webp", width: 960, height: 600 },
    long: { src: "/projetos/lumina/long.webp", width: 960, height: 3948 },
    tags: ["React", "Vite", "Tailwind CSS", "React Router"],
    techStack: ["React 18", "Vite", "React Router", "Tailwind CSS", "Vercel"],
    featured: true,
  },
  {
    slug: "dentilusa",
    name: "DentiLusa",
    category: "institucional",
    liveUrl: "https://dentilusa.vercel.app",
    // Repositório privado: não é exposto no site.
    cover: { src: "/projetos/dentilusa/cover.webp", width: 960, height: 600 },
    long: { src: "/projetos/dentilusa/long.webp", width: 960, height: 8316 },
    tags: ["HTML", "CSS", "JavaScript", "Formulários"],
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
    featured: false,
  },
  {
    slug: "aqualis",
    name: "AquaLis",
    category: "landing-page",
    liveUrl: "https://aqualis-tau.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/aqualis",
    cover: { src: "/projetos/aqualis/cover.webp", width: 960, height: 600 },
    long: { src: "/projetos/aqualis/long.webp", width: 960, height: 6260 },
    tags: ["HTML", "CSS", "JavaScript", "SEO local"],
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
    featured: false,
  },
  {
    slug: "forja",
    name: "FORJA",
    category: "institucional",
    liveUrl: "https://forja-training-club.vercel.app",
    repoUrl: "https://github.com/MateusMendes17/forja-training-club",
    cover: { src: "/projetos/forja/cover.webp", width: 960, height: 600 },
    long: { src: "/projetos/forja/long.webp", width: 960, height: 6615 },
    tags: ["HTML", "CSS", "JavaScript", "Módulos ES"],
    techStack: ["HTML", "CSS", "JavaScript (ES modules)", "Vercel"],
    featured: false,
  },
];

export const PROJECT_SLUGS = PROJECTS.map((project) => project.slug);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
