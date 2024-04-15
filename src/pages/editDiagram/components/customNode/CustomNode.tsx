import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal, message, Form } from 'antd'
import { Handle, Position } from 'reactflow'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Data } from '../../../../type/TDiagram'
import DiagramStore from '../../../../stores/DiagramStore'
import { Input } from '../../../../components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { diagramNode } from '../../../../schema/diagramSchema'

import styles from './CustomNode.module.css'

type Props = {
  data: Data
  isConnectable?: boolean
}

export const CustomNode = observer(({ data, isConnectable = true }: Props) => {
  const { id } = useParams<{ id?: string }>()
  const diagram = id ? DiagramStore.getDiagramById(id) : null
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formData, setFormData] = useState<Data>(
    { id: data.id, label: data.label } || {},
  )

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: formData,
    mode: 'onBlur',
    resolver: zodResolver(diagramNode),
  })

  useEffect(() => {
    setFocus('label')
  }, [setFocus])

  const handleAddNode = () => {
    const newNodeId =
      Math.max(...(diagram?.nodes.map(node => parseInt(node.id)) || [])) + 1
    const newEdgeId =
      Math.max(...(diagram?.edges.map(edge => parseInt(edge.id)) || [])) + 1
    const positionY = diagram?.nodes[diagram.nodes.length - 1]?.position.y || 0

    const newNode = {
      id: newNodeId.toString(),
      type: 'custom',
      data: {
        id: newNodeId.toString(),
        label: `Block ${newNodeId}`,
      },
      position: { x: 0, y: positionY + 120 },
    }
    const newEdge = {
      id: newEdgeId.toString(),
      source: newEdgeId.toString(),
      target: (newNodeId + 1).toString(),
    }
    if (id) {
      DiagramStore.addEdge(id, newEdge)
      DiagramStore.addNode(id, newNode)
    } else {
      message.error('Не удалось выполнить операцию: диаграмма не найдена')
    }

    DiagramStore.onEdgesChange([newEdge])
    message.success('Нода добавлена')
  }

  const handleEditNode = () => {
    setIsModalVisible(true)
  }

  const handleDeleteNode = (nodeId: string) => {
    if (id) {
      try {
        DiagramStore.deleteNode(id, nodeId)
        message.success('Нода удалена')
      } catch (error) {
        message.error('Произошла ошибка при удалении ноды')
      }
    } else {
      message.error('Не удалось выполнить операцию: диаграмма не найдена')
    }
  }

  const handleFormSubmit = (data: Data) => {
    if (id) {
      try {
        DiagramStore.editNode(id, data.id, data.label)
        setIsModalVisible(false)
      } catch (error) {
        message.error('Произошла ошибка при редактировании ноды')
      }
    } else {
      message.error('Не удалось выполнить операцию: диаграмма не найдена')
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className={styles.Wrapper}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={params => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <div className={styles.Buttons}>
        <button className={styles.Button} onClick={handleEditNode}>
          <EditOutlined />
        </button>
        <button className={styles.Button} onClick={handleAddNode}>
          <PlusOutlined />
        </button>
        <button
          className={styles.Button}
          onClick={() => handleDeleteNode(data.id)}
        >
          <DeleteOutlined />
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Modal
        title="Редактирование ноды"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
          <Input
            label="Название диаграммы"
            onChange={event => handleInputChange('label', event.target.value)}
            errors={errors}
            name="label"
            control={control}
            placeholder="Введите название диаграммы"
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Изменить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
