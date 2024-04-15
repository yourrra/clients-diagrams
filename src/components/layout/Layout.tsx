import type { ReactNode } from 'react'
import { Layout as AntdLayout } from 'antd'
import { Header } from '../header'
import { Footer } from '../footer'
import { Breadcrumb } from '../breadcrumb'

import styles from './Layout.module.css'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Header />
      <AntdLayout.Content className={styles.Content}>
        <Breadcrumb />
        {children}
      </AntdLayout.Content>
      <Footer />
    </AntdLayout>
  )
}

{
  /* <AntdLayout.Content style={{ padding: '0 48px' }}>
<Breadcrumb />
{children}
</AntdLayout.Content> */
}
