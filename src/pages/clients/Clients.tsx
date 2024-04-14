import { Layout } from '../../components/layout'
import { Link } from '../../components/link'
import { Table, Button, Modal, message } from 'antd'
import type { TableColumnsType } from 'antd'
import { observer } from 'mobx-react-lite'
import ClientStore from '../../stores/ClientStore'
import { useState } from 'react'
import { CLIENTS_EDIT, ROUTES } from '../../constants/urls'
import { IClient } from '../../type/IClient'

import styles from './Clients.module.css'

type DataType = Omit<
  IClient,
  keyof { phone: string; email: string; address?: string }
> & { key: React.Key }

const columns: TableColumnsType<DataType> = [
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    render: (text, record) => (
      <Link type="link" props={{ to: ROUTES.CLIENTS_EDIT(record.id) }}>
        {text}
      </Link>
    ),
  },
  {
    title: 'Имя',
    dataIndex: 'firstName',
  },
  {
    title: 'Отчество',
    dataIndex: 'fatherName',
  },
]

export const Clients = observer(() => {
  const { clients, removeClient } = ClientStore

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.error('Выберите клиентов для удаления')
      return
    }
    setIsModalVisible(true)
  }

  const handleOk = () => {
    removeClient(selectedRowKeys)
    setIsModalVisible(false)
    setSelectedRowKeys([])
    message.success('Клиент удален')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <Layout>
      <div className={styles.Wrapper}>
        <div>
          <Button type="primary">
            <Link type="link" props={{ to: ROUTES.CLIENTS_CREATE }}>
              Добавить
            </Link>
          </Button>
        </div>
        <div className={styles.SelectedElem}>
          {`Выбранных элементов: ${selectedRowKeys.length}`}
          <Button
            type="primary"
            onClick={handleDelete}
            disabled={!hasSelected}
            danger
          >
            Удалить
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={clients.map(client => ({
            ...client,
            key: client.id,
          }))}
        />
        <Modal
          title="Подтвердите удаление"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Удалить"
          cancelText="Отмена"
        >
          <p>Вы уверены, что хотите удалить выбранного клиента?</p>
        </Modal>
      </div>
    </Layout>
  )
})
