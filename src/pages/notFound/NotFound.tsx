import { useRouteError } from 'react-router-dom'

import styles from './NotFound.module.css'
import { Button } from 'antd'
import { Link } from '../../components/link'
import { ROUTES } from '../../constants/urls'

export const NotFound = () => {
  const error = useRouteError()

  return (
    <div className={styles.error}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <div>
        <Button>
          <Link type="link" props={{ to: ROUTES.MAIN }}>
            На главную
          </Link>
        </Button>
      </div>
    </div>
  )
}
