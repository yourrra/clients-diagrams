import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formSchema } from '../../../schema/formSchema'
import { Input } from '../../../components/input'
import { ROUTES } from '../../../constants/urls'
import { useEffect, useState } from 'react'
import { FormData } from '../../../type/TClient'

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
  }, [setFocus])

  const handleFormSubmit = (data: FormData) => {
    try {
      onSubmit(data)
      if (defaultValues) {
        message.success('Клиент изменен')
      } else {
        message.success('Клиент добавлен')
      }
      navigate(ROUTES.CLIENTS)
    } catch (error) {
      if (defaultValues) {
        message.error('Произошла ошибка при изменении клиента')
      } else {
        message.error('Произошла ошибка при добавлении клиента')
      }
    }
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
        onChange={event => handleInputChange('lastName', event.target.value)}
        errors={errors}
        name="lastName"
        control={control}
        placeholder="Введите фамилию"
      />
      <Input
        label="Имя"
        onChange={event => handleInputChange('firstName', event.target.value)}
        errors={errors}
        name="firstName"
        control={control}
        placeholder="Введите имя"
      />
      <Input
        label="Отчество"
        onChange={event => handleInputChange('fatherName', event.target.value)}
        errors={errors}
        name="fatherName"
        control={control}
        placeholder="Введите отчество"
      />
      <Input
        label="Телефон"
        onChange={event => handleInputChange('phone', event.target.value)}
        errors={errors}
        name="phone"
        control={control}
        placeholder="Введите телефон"
      />
      <Input
        label="Эл. почта"
        onChange={event => handleInputChange('email', event.target.value)}
        errors={errors}
        name="email"
        control={control}
        placeholder="Введите эл. почта"
      />
      <Input
        label="Адрес"
        onChange={event => handleInputChange('address', event.target.value)}
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
