import JsonDictionary from '@/dictionaries/en.json'

export enum LocaleEnum {
  EN = 'en',
  VI = 'vi',
}

export type LocaleKeys = Record<keyof typeof JsonDictionary, string>
