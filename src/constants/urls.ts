export const ROUTES = {
  MAIN: '/',
  CLIENTS: '/clients',
  CLIENTS_CREATE: '/clients/create',
  CLIENTS_EDIT: (id: string = ':id') => `/clients/edit/${id}`,
  DIAGRAMS: '/diagrams',
  DIAGRAMS_CREATE: '/diagrams/create',
  DIAGRAMS_EDIT: (id: string = ':id') => `/diagrams/edit/${id}`,
}
