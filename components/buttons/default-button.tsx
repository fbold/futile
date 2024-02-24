import clsx from 'clsx'
import Link from 'next/link'
import React, { MouseEventHandler, PropsWithChildren } from 'react'

type DefaultButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const DefaultButton: React.FC<PropsWithChildren<DefaultButtonProps>> = ({
  onClick,
  href,
  children,
  className,
  type,
}) => {
  if (href)
    return (
      <Link
        href={href}
        className={clsx(
          'h-full relative px-2 text-txt-pri dark:text-txt-pri-d bg-sec dark:bg-sec-d border-acc dark:border-acc-d border flex items-center justify-center align-middle',
          className
        )}
      >
        {children}
      </Link>
    )
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={clsx(
        'h-full relative px-2 text-txt-pri dark:text-txt-pri-d bg-sec dark:bg-sec-d border-acc dark:border-acc-d border flex items-center justify-center align-middle',
        className
      )}
    >
      {children}
    </button>
  )
}
