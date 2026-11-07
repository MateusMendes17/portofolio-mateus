import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/views/ServiceDetailView";
import { pageMetadata } from "@/lib/seo";
import pt from "@/content/strings/pt";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getService(slug: string) {
  return pt.services.items.find((item) => item.id === slug);
}

export async function generateStaticParams() {
  return pt.services.items.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Serviço Não Encontrado" };

  return pageMetadata({
    title: `${service.title.split(" — ")[0]} em Portugal`,
    description: `${service.tagline} ${service.description}`.slice(0, 300),
    path: `/servicos/${service.id}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!getService(slug)) notFound();
  return <ServiceDetailView slug={slug} />;
}
