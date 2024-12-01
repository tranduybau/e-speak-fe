import Homepage from "@/components/business/home-page";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { DefaultPageProps } from "@/types/common";

export default async function Home({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang);
  return <Homepage />;
}
