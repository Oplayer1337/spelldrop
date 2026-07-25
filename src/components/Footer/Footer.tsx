import styles from './Footer.module.css'

interface FooterProps {
  isProcessPage?: boolean
}

export function Footer({ isProcessPage = false }: FooterProps) {
  const navigationItems = [{ href: '/process', label: 'AI Worklog' }]

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <a href={isProcessPage ? '/' : '#main-content'}>SPELLDROP</a>
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
