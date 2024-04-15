import { Layout } from '../../components/layout'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/input'
import { ROUTES } from '../../constants/urls'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { diagramSchema } from '../../schema/diagramSchema'
import { TDiagram } from '../../type/TDiagram'

import DiagramStore from '../../stores/DiagramStore'

type DiagramForm = Omit<TDiagram, 'id' | 'nodes'>

export const AddDiagram = observer(() => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<DiagramForm>({
    mode: 'onBlur',
    resolver: zodResolver(diagramSchema),
  })

  useEffect(() => {
    setFocus('name')
  }, [setFocus])

  const createDiagram = async (name: string) => {
    const newDiagram = {
      id: uuidv4(),
      name: name,
      nodes: [
        {
          id: '1',
          type: 'custom',
          data: { label: 'Block 1' },
          position: { x: 0, y: 0 },
        },
      ],
      edges: [{ id: '1', source: '1', target: '2' }],
    }
    DiagramStore.addDiagram(newDiagram)
    return newDiagram
  }

  const handleFormSubmit = (data: DiagramForm) => {
    try {
      createDiagram(data.name)
      navigate(ROUTES.DIAGRAMS)
    } catch (error) {
      message.error('Произошла ошибка при создании диаграммы')
    }
  }

  const handleResetForm = () => {
    reset()
  }

  return (
    <Layout>
      <div>
        <h1>{'Добавить диаграмму'}</h1>
        <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
          <Input
            label="Название диаграммы"
            errors={errors}
            name="name"
            control={control}
            placeholder="Введите название диаграммы"
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
            <Button
              type="default"
              onClick={handleResetForm}
              style={{ marginLeft: '8px' }}
            >
              Сбросить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  )
})
