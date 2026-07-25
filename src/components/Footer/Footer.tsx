import styles from './Footer.module.css'

interface FooterProps {
  isProcessPage?: boolean
}

export function Footer({ isProcessPage = false }: FooterProps) {
  const navigationItems = [{ href: '/process', label: 'AI Worklog' },
                          { href: 'https://t.me/oplayer1337', label: 'Telegram', target: '__blank'},
                          {href: 'https://github.com/Oplayer1337/spelldrop', label: 'Github', target: '__blank'}]

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
              <a key={item.href} href={item.href} target={item.target}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <p className={styles.legal}>© 2026 SPELLDROP. Задание для MOX Creative Studio.</p>
      </div>
    </footer>
  )
}
