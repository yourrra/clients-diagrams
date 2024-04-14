import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './constants/urls'
import { Main } from './pages/main'
import { NotFound } from './pages/notFound'
import { Clients } from './pages/clients'
import { Diagrams } from './pages/diagrams'
import { AddEditDiagram } from './pages/addEditDiagram'
import { AddEditClient } from './pages/addEditClient'

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Main />,
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.CLIENTS,
    element: <Clients />,
  },
  {
    path: ROUTES.CLIENTS_CREATE,
    element: <AddEditClient />,
  },
  {
    path: ROUTES.CLIENTS_EDIT(),
    element: <AddEditClient />,
  },
  {
    path: ROUTES.DIAGRAMS,
    element: <Diagrams />,
  },
  {
    path: ROUTES.DIAGRAMS_CREATE,
    element: <AddEditDiagram />,
  },
  {
    path: ROUTES.DIAGRAMS_EDIT(),
    element: <AddEditDiagram />,
  },
])
