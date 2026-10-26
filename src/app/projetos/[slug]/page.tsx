import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/content/projects";
import { ProjectDetailView } from "@/components/views/ProjectDetailView";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import pt from "@/content/strings/pt";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const study = project
    ? pt.projectDetail.studies[project.slug as keyof typeof pt.projectDetail.studies]
    : null;

  if (!project || !study) {
    return {
      title: "Projeto Não Encontrado",
    };
  }

  return pageMetadata({
    title: `${project.name} — Case Study`,
    description: study.summary,
    path: `/projetos/${project.slug}`,
    image: {
      url: project.cover.src,
      width: project.cover.width,
      height: project.cover.height,
      alt: pt.projectDetail.labels.coverAlt.replace("{name}", project.name),
    },
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const study = project
    ? pt.projectDetail.studies[project.slug as keyof typeof pt.projectDetail.studies]
    : null;

  if (!project || !study) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((item) => item.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject =
    currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  const projectUrl = `${SITE_URL}/projetos/${project.slug}`;
  const imageUrl = `${SITE_URL}${project.cover.src}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${projectUrl}#case-study`,
      name: `${project.name} — Case Study`,
      description: study.summary,
      url: projectUrl,
      image: imageUrl,
      inLanguage: "pt-PT",
      creator: {
        "@type": "Person",
        name: "Mateus Mendes",
        url: SITE_URL,
      },
      about: study.sector,
      keywords: project.techStack.join(", "),
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: pt.meta.siteName,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: pt.nav.home,
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pt.nav.projects,
          item: `${SITE_URL}/projetos`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.name,
          item: projectUrl,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetailView
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}
