import type { ReactNode } from 'react'
import type { SelectionTone } from '../../types/configurator'
import styles from './SelectionCard.module.css'

interface SelectionCardProps {
  title: string
  description?: string
  selected: boolean
  disabled?: boolean
  onSelect: () => void
  children?: ReactNode
  imageSrc?: string
  tone?: SelectionTone
  variant?: 'tile' | 'bottle'
}

export function SelectionCard({
  title,
  description,
  selected,
  disabled = false,
  onSelect,
  children,
  imageSrc,
  tone,
  variant = 'tile',
}: SelectionCardProps) {
  return (
    <button
      className={`${styles.card} ${styles[variant]}`}
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      data-tone={tone}
    >
      <span className={styles.content}>
        {imageSrc || children ? (
          <span className={styles.visual}>
            {imageSrc ? <img className={styles.image} src={imageSrc} alt="" /> : children}
          </span>
        ) : null}
        <span className={styles.copy}>
          <strong>{title}</strong>
          {description ? <span>{description}</span> : null}
        </span>
      </span>
      <span className={styles.checkmark} aria-hidden="true" />
    </button>
  )
}
