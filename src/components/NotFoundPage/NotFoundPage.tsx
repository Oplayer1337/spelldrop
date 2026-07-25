import { configuratorAssets } from '../../data/assets'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className="page-shell">
      <Header isProcessPage />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={styles.content} aria-labelledby="not-found-title">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>ОШИБКА 404</p>
            <h1 id="not-found-title">Похоже, это заклинание не существует</h1>
            <p className={styles.description}>
              Возможно, оно было утеряно при телепортации или ещё не добавлено в каталог ведьмочек.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="/">
                Вернуться на главную
              </a>
              <a className={styles.secondaryAction} href="/process">
                Посмотреть AI Worklog
              </a>
            </div>
          </div>
          <div className={styles.artwork} aria-hidden="true">
            <img src={configuratorAssets.delivery.teleport} alt="" />
          </div>
        </section>
      </main>
      <Footer isProcessPage />
    </div>
  )
}
