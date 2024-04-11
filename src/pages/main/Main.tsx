import { ButtonCard } from '../../components/buttonCard'
import { Layout } from '../../components/layout'
import { ROUTES } from '../../constants/urls'

import styles from './Main.module.css'

export const Main = () => {
  return (
    <Layout>
      <div className={styles.Wrapper}>
        <ButtonCard
          link={ROUTES.CLIENTS}
          title="Клиенты"
          description="Таблица клиентов"
        />
        <ButtonCard
          link={ROUTES.DIAGRAMS}
          title="Диаграммы"
          description="Таблица диаграмм"
        />
      </div>
    </Layout>
  )
}
