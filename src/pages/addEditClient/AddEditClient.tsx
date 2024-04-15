import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Layout } from '../../components/layout'
import { TClient } from '../../type/TClient'
import { AddEditForm } from './compponents/AddEditForm'
import { v4 as uuidv4 } from 'uuid'
import { FormData } from '../../type/TClient'
import { useCallback } from 'react'
import ClientStore from '../../stores/ClientStore'

import styles from './AddEditClient.module.css'

export const AddEditClient = observer(() => {
  const { id } = useParams<{ id?: string }>()

  const client = id
    ? ClientStore.clients.find((c: TClient) => c.id === id)
    : null

  const handleSubmit = useCallback((data: FormData) => {
    if (id) {
      ClientStore.editClient({ ...data, id })
    } else {
      const newId = uuidv4()
      ClientStore.addClient({ ...data, id: newId })
    }
  }, [])

  return (
    <Layout>
      <div className={styles.Wrapper}>
        <h1>{id ? 'Редактирование клиента' : 'Добавление клиента'}</h1>
        <hr />
        <AddEditForm onSubmit={handleSubmit} defaultValues={client} />
      </div>
    </Layout>
  )
})
