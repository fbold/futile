import { DefaultButton } from '@/components/buttons'
import { IconLoader2 } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { MouseEventHandler, PropsWithChildren } from 'react'

type MutationButtonTypes = {
  onClick: MouseEventHandler<HTMLButtonElement>
  fetching: boolean
  className?: string
}

export const MutationButton: React.FC<
  PropsWithChildren<MutationButtonTypes>
> = ({ onClick, className, fetching, children }) => {
  return (
    <DefaultButton className={className} onClick={onClick}>
      <span
        className={clsx(
          'transition-opacity duration-100',
          fetching ? 'opacity-0' : 'opacity-100'
        )}
      >
        {children || 'Save'}
      </span>
      <IconLoader2
        className={clsx(
          'absolute transition-opacity duration-70 animate-spin',
          fetching ? 'opacity-100 ' : 'opacity-0'
        )}
      />
    </DefaultButton>
  )
}
