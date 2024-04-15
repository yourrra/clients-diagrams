export type TClient = {
  id: string
  firstName: string
  lastName: string
  fatherName: string
  phone: string
  email: string
  address?: string
}

export type FormData = Omit<TClient, 'id'>
