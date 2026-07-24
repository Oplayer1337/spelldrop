import { useState } from 'react'
import styles from './Header.module.css'

const navigationItems = [
  { href: '#how-it-works', label: 'Как это работает' },
  { href: '#delivery-methods', label: 'Работа доставки' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#main-content" onClick={closeMenu}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandName}>SPELLDROP</span>
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.navigation} ${isMenuOpen ? styles.navigationOpen : ''}`}
          aria-label="Основная навигация"
        >
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.orderLink} href="#configurator" aria-label="Перейти к конфигуратору">
          <span className={styles.cubeIcon} aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
