import styles from './Footer.module.css'

const navigationItems = [
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#delivery-methods', label: 'Работа доставки' },
  { href: '#configurator', label: 'Подобрать зелье' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <a href="#main-content">SPELLDROP</a>
            <p>Служба доставки заклинаний</p>
          </div>
          <nav className={styles.navigation} aria-label="Навигация в подвале">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <p className={styles.legal}>© 2026 SPELLDROP. Магия применяется на свой страх и хорошую карму.</p>
      </div>
    </footer>
  )
}
