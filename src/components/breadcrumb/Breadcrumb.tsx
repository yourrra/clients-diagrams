import { useLocation, useParams } from 'react-router-dom'
import { Link } from '../link'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { ROUTES } from '../../constants/urls'

export const Breadcrumb = () => {
  const { pathname } = useLocation()
  const { id } = useParams<{ id?: string }>()

  const pathnames = pathname.split('/').filter(item => item)
  const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const breadcrumbs = pathnames.map((name, index) => {
    if (name === 'edit' && id) return null

    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
    const isLast = index === pathnames.length - 1

    if (name === 'clients') name = 'Клиенты'
    if (name === 'diagrams') name = 'Диаграммы'
    if (routeTo === '/clients/create') name = 'Добавить клиента'
    if (routeTo === '/diagrams/create') name = 'Добавить диаграмму'
    if (name === id) name = 'Редактирование клиента'
    if (routeTo === `/diagrams/edit/${id}`) name = 'Редактирование диаграммы'

    return (
      <AntdBreadcrumb.Item key={index}>
        {isLast ? (
          capatilize(name)
        ) : (
          <Link type="link" props={{ to: routeTo }}>
            {capatilize(name)}
          </Link>
        )}
      </AntdBreadcrumb.Item>
    )
  })

  return (
    <div>
      <AntdBreadcrumb style={{ margin: '16px 0' }}>
        <AntdBreadcrumb.Item>
          <Link type="link" props={{ to: ROUTES.MAIN }}>
            Главная
          </Link>
        </AntdBreadcrumb.Item>
        {breadcrumbs}
      </AntdBreadcrumb>
    </div>
  )
}
