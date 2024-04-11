import { makeAutoObservable } from 'mobx'
import { IClient } from '../type/IClient'

class ClientStore {
  clients: IClient[] = []

  constructor() {
    makeAutoObservable(this)
    this.loadClients()
  }

  loadClients() {
    const savedClients = localStorage.getItem('clients')
    if (savedClients) {
      this.clients = JSON.parse(savedClients)
    }
  }

  saveClients() {
    localStorage.setItem('clients', JSON.stringify(this.clients))
  }

  addClient(client: IClient) {
    this.clients.push(client)
    this.saveClients()
  }

  removeClient(id: string) {
    this.clients = this.clients.filter(client => client.id !== id)
    this.saveClients()
  }

  editClient(updatedClient: IClient) {
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
