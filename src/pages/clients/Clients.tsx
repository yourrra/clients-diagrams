import { Layout } from '../../components/layout'
import { Link } from '../../components/link'
import { Table, Button, Modal, message } from 'antd'
import type { TableColumnsType } from 'antd'
import { observer } from 'mobx-react-lite'
import clientStore from '../../stores/ClientStore'
import { useState } from 'react'

import styles from './Clients.module.css'
import { ROUTES } from '../../constants/urls'

interface DataType {
  key: React.Key
  firstName: string
  lastName: string
  middleName: string
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
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
  const { clients, removeClient } = clientStore

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.error('Выберите клиентов для удаления')
      return
    }
    setIsModalVisible(true)
  }

  const handleOk = () => {
    removeClient(selectedRowKeys[0].toString()) // Удаляем только первого выбранного клиента
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
        <Button type="primary">
          <Link type="link" props={{ to: ROUTES.CLIENTS_CREATE }}>
            Добавить
          </Link>
        </Button>
        <div className={styles.SelectedElem}>
          <span>
            {hasSelected
              ? `Выбранных элементов: ${selectedRowKeys.length} `
              : ''}
          </span>
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
          dataSource={clients}
          pagination={false}
        />
        <Modal
          title="Подтвердите удаление"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Удалить"
          cancelText="Отмена"
        >
          <p>Вы уверены, что хотите удалить этого клиента?</p>
        </Modal>
      </div>
    </Layout>
  )
})
