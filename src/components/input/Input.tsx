import { Input as AntdInput, Form } from 'antd'
import { FormItem } from 'react-hook-form-antd'
import { Control, FieldValues, Path } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

type Props = {
  control: Control<any>
  name: string
  label?: string
  helperText?: string
  errors: unknown
  placeholder?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ control, name, label, placeholder }: Props) => {
  return (
    <FormItem control={control} name={name} label={label}>
      <AntdInput placeholder={placeholder} size="large" />
    </FormItem>
  )
}
