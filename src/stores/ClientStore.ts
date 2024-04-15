import { makeAutoObservable } from 'mobx'
import { TClient } from '../type/TClient'

class ClientStore {
  clients: TClient[] = []

  constructor() {
    makeAutoObservable(this)
    this.clients = []
    this.loadClients()
  }

  loadClients = () => {
    try {
      const savedClients = localStorage.getItem('clients')
      if (savedClients) {
        this.clients = JSON.parse(savedClients)
      }
    } catch (error) {
      console.error('Не удалось загрузить клиентов:', error)
      return []
    }
  }

  saveClients = () => {
    try {
      localStorage.setItem('clients', JSON.stringify(this.clients))
    } catch (error) {
      console.error('Не удалось сохранить клиента:', error)
    }
  }

  addClient = (client: TClient) => {
    this.clients.push(client)
    this.saveClients()
  }

  removeClient = (ids: React.Key[]) => {
    if (this.clients) {
      this.clients = this.clients.filter(client => !ids.includes(client.id))
      this.saveClients()
    } else {
      console.error('Клиент не определен')
    }
  }

  editClient = (updatedClient: TClient) => {
    const index = this.clients.findIndex(
      client => client.id === updatedClient.id,
    )
    if (index !== -1) {
      this.clients[index] = updatedClient
      this.saveClients()
    }
  }
}

export default new ClientStore()
