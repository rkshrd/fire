import veilleData from "@/data/veille.json";
import VeilleContent from "@/components/veille/VeilleContent";

export function generateStaticParams() {
    return veilleData.veilles.map((v) => ({ slug: v.slug }));
}

export default async function VeilleSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <VeilleContent initialSlug={slug} />;
}