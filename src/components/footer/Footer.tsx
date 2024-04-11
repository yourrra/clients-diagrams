import { Layout as AntdLayout } from 'antd'

export const Footer = () => {
  return (
    <AntdLayout.Footer style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </AntdLayout.Footer>
  )
}
