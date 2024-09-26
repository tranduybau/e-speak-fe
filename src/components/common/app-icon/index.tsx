import React, { SVGProps } from 'react'
import isEqual from 'react-fast-compare'

import { cn } from '@/lib/utils'

interface IAppIconProps extends SVGProps<SVGSVGElement> {
  src: string
}

function AppIcon(props: IAppIconProps) {
  const { id = 'id', src, className = '', viewBox, width = 16, height = width } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={cn('pointer-events-none h-full w-full duration-300', className)}
    >
      <use href={`${src}#${id}`} width={width} height={height} />
    </svg>
  )
}

export default React.memo(AppIcon, isEqual)
