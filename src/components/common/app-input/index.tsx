'use client'

import { memo } from 'react'
import isEqual from 'react-fast-compare'

interface IAppInputLayoutProps {
  children: React.ReactNode
  inputPrefix?: React.ReactNode
  inputSuffix?: React.ReactNode
}
const AppInputLayout = memo(function AppInputLayout({
  children,
  inputPrefix,
  inputSuffix,
}: IAppInputLayoutProps) {
  return (
    <div>
      {inputPrefix && (
        <span className="inputPrefix flex items-center justify-center">{inputPrefix}</span>
      )}

      <div className="w-full leading-[1.4375rem]">{children}</div>

      {inputSuffix && (
        <span className="inputSuffix flex items-center justify-center">{inputSuffix}</span>
      )}
    </div>
  )
}, isEqual)
AppInputLayout.displayName = 'AppInputLayout'

export { AppInputLayout }
