import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

import styles from './Link.module.css'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

type Props = PropsWithChildren<
  | {
      type: 'a'
      props: AnchorProps
    }
  | {
      type: 'link'
      props: LinkProps
    }
>

export const Link = ({ type, props, children }: Props) => {
  if (type === 'a') {
    return (
      <a {...props} className={styles.link}>
        {children}
      </a>
    )
  }

  return (
    <ReactRouterLink {...props} className={styles.link}>
      {children}
    </ReactRouterLink>
  )
}
