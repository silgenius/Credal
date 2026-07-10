import ContributionDetail from "@/components/contributions/ContributionDetail";

export default async function ContributionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ContributionDetail id={id} />;
}