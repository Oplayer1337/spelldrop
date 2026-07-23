import type { ReactNode } from 'react'
import styles from './SelectionGroup.module.css'

interface SelectionGroupProps {
  legend: string
  description?: string
  children: ReactNode
}

export function SelectionGroup({ legend, description, children }: SelectionGroupProps) {
  return (
    <fieldset className={styles.group}>
      <legend>{legend}</legend>
      {description ? <p>{description}</p> : null}
      <div className={styles.options}>{children}</div>
    </fieldset>
  )
}
