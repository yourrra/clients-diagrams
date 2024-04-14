import { useParams } from 'react-router-dom'
import { Layout } from '../../components/layout'
import { IClient } from '../../type/IClient'
import { AddEditForm } from './compponents/AddEditForm'
import ClientStore from '../../stores/ClientStore'
import { v4 as uuidv4 } from 'uuid'

export const AddEditClient = () => {
  const { id } = useParams<{ id?: string }>()

  const client = id
    ? ClientStore.clients.find((c: IClient) => c.id === id)
    : null

  const handleSubmit = data => {
    if (id) {
      // Редактирование клиента
      ClientStore.editClient({ ...data, id })
    } else {
      // Добавление клиента
      const newId = uuidv4()
      ClientStore.addClient({ ...data, id: newId })
    }
  }

  return (
    <Layout>
      <div>
        <h1>{id ? 'Редактирование клиента' : 'Добавление клиента'}</h1>
        <AddEditForm onSubmit={handleSubmit} defaultValues={client} />
      </div>
    </Layout>
  )
}
