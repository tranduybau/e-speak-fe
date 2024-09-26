import { LocaleEnum } from '@/types/locales'

export const i18n = {
  defaultLocale: LocaleEnum.EN,
  locales: [LocaleEnum.EN, LocaleEnum.VI],
} as const

export type Locale = (typeof i18n)['locales'][number]
