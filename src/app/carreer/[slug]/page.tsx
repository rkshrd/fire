import companiesData from "@/data/companies.json";
import CarreerContent from "@/components/carreer/CarreerContent";

export function generateStaticParams() {
    return companiesData.companies.map((c) => ({ slug: c.slug }));
}

export default async function CarreerSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <CarreerContent initialSlug={slug} />;
}