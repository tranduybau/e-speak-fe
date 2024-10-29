import { PropsWithChildren } from 'react'

import { Category } from './utils'

interface CharacterWithCategoryProps extends PropsWithChildren {
  category: Category
}

export function CharacterWithCategory({ children, category }: CharacterWithCategoryProps) {
  let colorClassName: string = ''
  switch (category) {
    case 'green':
      colorClassName = 'text-green-500'
      break
    case 'yellow':
      colorClassName = 'text-yellow-500'
      break
    default:
      colorClassName = 'text-red-500'
  }

  return <span className={colorClassName}>{children}</span>
}
