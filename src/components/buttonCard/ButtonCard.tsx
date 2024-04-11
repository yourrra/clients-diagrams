import { Link } from '../link'

import styles from './ButtonCard.module.css'

type Props = {
  link: string
  title: string
  description: string
}

export const ButtonCard = ({ link, title, description }: Props) => {
  return (
    <Link type="link" props={{ to: link }}>
      <div className={styles.Wrapper}>
        <h2 className={styles.Title}>{title}</h2>
        <p className={styles.Description}>{description}</p>
      </div>
    </Link>
  )
}
