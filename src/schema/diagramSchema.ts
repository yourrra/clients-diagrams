import { z } from 'zod'

export const diagramSchema = z.object({
  name: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, { message: 'Имя пользователя слишком короткое' })
    .max(20, { message: 'Имя пользователя слишком длинное' }),
})

export const diagramNode = z.object({
  label: z
    .string({
      required_error: 'Поле обязательно',
      invalid_type_error: 'Name must be a string',
    })
    .min(2, { message: 'Имя пользователя слишком короткое' })
    .max(20, { message: 'Имя пользователя слишком длинное' }),
  id: z.string({
    required_error: 'Поле обязательно',
    invalid_type_error: 'Name must be a string',
  }),
})
