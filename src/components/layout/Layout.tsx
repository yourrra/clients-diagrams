import type { ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Breadcrumb, Layout as AntdLayout } from 'antd'
import { Header } from '../header'
import { Footer } from '../footer'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const location = useLocation()
  // Разбиваем текущий URL на массив сегментов
  const pathSnippets = location.pathname.split('/').filter(i => i)

  // Генерируем breadcrumbs на основе текущего URL
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{url === '/' ? 'Home' : pathSnippets[index]}</Link>
      </Breadcrumb.Item>
    )
  })

  const breadcrumbs = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
    ...extraBreadcrumbItems,
  ]

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Header />
      <AntdLayout.Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbs}</Breadcrumb>

        {children}
      </AntdLayout.Content>
      <Footer />
    </AntdLayout>
  )
}
