import { Layout as AntdLayout } from 'antd'

export const Footer = () => {
  return (
    <AntdLayout.Footer style={{ textAlign: 'center' }}>
      Тестовое задание ©{new Date().getFullYear()} Created by @yoour_raa
    </AntdLayout.Footer>
  )
}
