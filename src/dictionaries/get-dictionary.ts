import 'server-only'

import { LocaleEnum, LocaleKeys } from '@/types/locales'

const dictionaries: Record<LocaleEnum, () => Promise<LocaleKeys>> = {
  [LocaleEnum.EN]: () => import('./en.json').then((module) => module.default),
  [LocaleEnum.VI]: () => import('./vi.json').then((module) => module.default),
}

export const getDictionary = async (locale: LocaleEnum) =>
  dictionaries[locale]?.() ?? dictionaries.en()
