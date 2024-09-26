import { ReactNode } from 'react'

import { LocaleEnum, LocaleKeys } from './locales'

export enum AppStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
}

export interface DefaultViewProps {
  dictionary: LocaleKeys
}

export interface DefaultPageProps {
  params: { lang: LocaleEnum }
}

export interface DictionaryProps {
  dictionary: LocaleKeys
}

export type OptionValue = string
export interface OptionRequired {
  value: OptionValue
  label: string | ReactNode
}

export interface ICustomFile {
  id: string
  file?: File
  fileUrl?: string
  errorMessage?: string
}

export type HTMLTypeWithoutRefHasClassNameOptional<T> = React.HTMLAttributes<
  React.PropsWithoutRef<T>
> & {
  className?: string
}

export interface ITabsItem {
  label: string
  value: string
}
