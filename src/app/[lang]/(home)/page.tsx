import Homepage from '@/components/business/home-page'
import { getDictionary } from '@/dictionaries/get-dictionary'
import { DefaultPageProps } from '@/types/common'

export default async function Home({ params }: DefaultPageProps) {
  const dictionary = await getDictionary(params.lang)

  console.log(`🆘 src/app/[lang]/(home)/page.tsx`); // eslint-disable-line
  console.log(dictionary); // eslint-disable-line
  console.log("%c => dictionary ", "background: #0095FF; color: #fff"); // eslint-disable-line
  console.log(new Date()); // eslint-disable-line

  return <Homepage />
}
