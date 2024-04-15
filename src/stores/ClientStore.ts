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
    const savedClients = localStorage.getItem('clients')
    if (savedClients) {
      this.clients = JSON.parse(savedClients)
    }
  }

  saveClients = () => {
    localStorage.setItem('clients', JSON.stringify(this.clients))
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
      console.error('Clients array is undefined')
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
