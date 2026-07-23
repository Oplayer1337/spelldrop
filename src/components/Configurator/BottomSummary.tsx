import type { SelectionValue } from '../../types/configurator'
import styles from './BottomSummary.module.css'

interface BottomSummaryProps {
  items: SelectionValue[]
  isFirstStep: boolean
  canProceed: boolean
  nextLabel: string
  mascotSrc: string
  mascotPosition: 'left' | 'right'
  onBack: () => void
  onNext: () => void
}

export function BottomSummary({
  items,
  isFirstStep,
  canProceed,
  nextLabel,
  mascotSrc,
  mascotPosition,
  onBack,
  onNext,
}: BottomSummaryProps) {
  return (
    <aside className={styles.summary} data-mascot-position={mascotPosition} aria-label="Сводка заказа">
      <img className={styles.mascot} src={mascotSrc} alt="" />
      <div className={styles.details}>
        <span className={styles.eyebrow}>Выбрано:</span>
        {items.length > 0 ? (
          <ul className={styles.chips}>
            {items.map((item) => (
              <li key={item.id}>
                {item.imageSrc ? <img src={item.imageSrc} alt="" /> : null}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Выберите вариант, чтобы продолжить настройку.</p>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.backButton} type="button" disabled={isFirstStep} onClick={onBack}>
          Назад
        </button>
        <button className={styles.nextButton} type="button" disabled={!canProceed} onClick={onNext}>
          <span className={styles.nextSparkle} aria-hidden="true" />
          {nextLabel}
        </button>
      </div>
    </aside>
  )
}
