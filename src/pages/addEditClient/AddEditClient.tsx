import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Layout } from '../../components/layout'
import { TClient } from '../../type/TClient'
import { AddEditForm } from './compponents/AddEditForm'
import { v4 as uuidv4 } from 'uuid'
import { FormData } from '../../type/TClient'
import { useCallback } from 'react'
import ClientStore from '../../stores/ClientStore'

export const AddEditClient = observer(() => {
  const { id } = useParams<{ id?: string }>()

  const client = id
    ? ClientStore.clients.find((c: TClient) => c.id === id)
    : null

  const handleSubmit = useCallback((data: FormData) => {
    if (id) {
      // Редактирование клиента
      ClientStore.editClient({ ...data, id })
    } else {
      // Добавление клиента
      const newId = uuidv4()
      ClientStore.addClient({ ...data, id: newId })
    }
  }, [])

  return (
    <Layout>
      <div>
        <h1>{id ? 'Редактирование клиента' : 'Добавление клиента'}</h1>
        <AddEditForm onSubmit={handleSubmit} defaultValues={client} />
      </div>
    </Layout>
  )
})
