import { z } from 'zod'

export const formSchema = z.object({
  firstName: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, { message: 'Имя пользователя слишком короткое' })
    .max(20, { message: 'Имя пользователя слишком длинное' })
    .regex(/^[A-Za-zА-Яа-я]/g, {
      message: 'Поле доложно содержать только буквы',
    }),
  lastName: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, { message: 'Фамилия пользователя слишком короткая' })
    .max(20, { message: 'Фамилия пользователя слишком длинная' })
    .regex(/^[A-Za-zА-Яа-я]/g, {
      message: 'Поле доложно содержать только буквы',
    }),
  fatherName: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, { message: 'Отчество пользователя слишком короткое' })
    .max(20, { message: 'Отчество пользователя слишком длинное' })
    .regex(/^[A-Za-zА-Яа-я]/g, {
      message: 'Поле доложно содержать только буквы',
    }),
  email: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .email('Некорректный email'),
  phone: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .regex(/^\d{11}$/, { message: 'Некорректный номер телефона' }),
  address: z.string().optional(),
})
