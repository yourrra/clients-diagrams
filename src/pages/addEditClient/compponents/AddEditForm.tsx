import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formSchema } from '../../../schema/formSchema'
import { IClient } from '../../../type/IClient'
import { Input } from '../../../components/input'
import { ROUTES } from '../../../constants/urls'
import { useEffect, useState } from 'react'

type FormData = Omit<IClient, 'id'>

interface Props {
  onSubmit: (data: FormData) => void
  defaultValues?: FormData
}

export const AddEditForm = ({ onSubmit, defaultValues }: Props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>(defaultValues || {})

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    setFocus('lastName')
  }, [])

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data)
    if (defaultValues) {
      message.success('Клиент изменен')
    } else {
      message.success('Клиент добавлен')
    }
    navigate(ROUTES.CLIENTS)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleResetForm = () => {
    setFormData({})
    reset()
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
      <Input
        label="Фамилия"
        onChange={value => handleInputChange('lastName', value)}
        errors={errors}
        name="lastName"
        control={control}
        placeholder="Введите фамилию"
      />
      <Input
        label="Имя"
        onChange={value => handleInputChange('firstName', value)}
        errors={errors}
        name="firstName"
        control={control}
        placeholder="Введите имя"
      />
      <Input
        label="Отчество"
        onChange={value => handleInputChange('fatherName', value)}
        errors={errors}
        name="fatherName"
        control={control}
        placeholder="Введите отчество"
      />
      <Input
        label="Телефон"
        onChange={value => handleInputChange('phone', value)}
        errors={errors}
        name="phone"
        control={control}
        placeholder="Введите телефон"
      />
      <Input
        label="Эл. почта"
        onChange={value => handleInputChange('email', value)}
        errors={errors}
        name="email"
        control={control}
        placeholder="Введите эл. почта"
      />
      <Input
        label="Адрес"
        onChange={value => handleInputChange('address', value)}
        errors={errors}
        name="address"
        control={control}
        placeholder="Введите адрес"
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
  )
}
