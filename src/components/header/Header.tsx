import { Layout as AntdLayout } from 'antd'
import { Logo } from '../logo'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <AntdLayout.Header className={styles.Header}>
      <Logo />
    </AntdLayout.Header>
  )
}
