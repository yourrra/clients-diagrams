import { Layout } from '../../components/layout'
import { Link } from '../../components/link'
import { Table, Button, Modal, message } from 'antd'
import type { TableColumnsType } from 'antd'
import { observer } from 'mobx-react-lite'
import DiagramStore from '../../stores/DiagramStore'
import { useState } from 'react'
import { ROUTES } from '../../constants/urls'

import styles from './Diagrams.module.css'

const columns: TableColumnsType = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    render: (text, record) => (
      <Link type="link" props={{ to: ROUTES.DIAGRAMS_EDIT(record.id) }}>
        {text}
      </Link>
    ),
  },
]

export const Diagrams = observer(() => {
  const { diagrams, removeDiagram } = DiagramStore
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.error('Выберите диаграммы для удаления')
      return
    }
    setIsModalVisible(true)
  }

  const handleOk = () => {
    removeDiagram(selectedRowKeys)
    setIsModalVisible(false)
    setSelectedRowKeys([])
    message.success('Диаграмма удалена')
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
        <div className={styles.ButtonAdd}>
          <Button type="primary">
            <Link
              type="link"
              props={{ to: ROUTES.DIAGRAMS_CREATE, style: { color: 'white' } }}
            >
              Добавить
            </Link>
          </Button>
        </div>
        <div className={styles.SelectedElem}>
          {`Выбранных диаграмм: ${selectedRowKeys.length}`}
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
          dataSource={diagrams.map(diagram => ({
            ...diagram,
            key: diagram.id,
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
          <p>Вы уверены, что хотите удалить выбранные диаграммы?</p>
        </Modal>
      </div>
    </Layout>
  )
})
