import type { KeyboardEvent } from 'react'
import { useRef } from 'react'
import type { ConfiguratorStepDefinition } from '../../types/configurator'
import styles from './StepIndicator.module.css'

interface StepIndicatorProps {
  steps: readonly ConfiguratorStepDefinition[]
  currentIndex: number
  onStepChange: (index: number) => void
}

export function StepIndicator({ steps, currentIndex, onStepChange }: StepIndicatorProps) {
  const stepButtons = useRef<Array<HTMLButtonElement | null>>([])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return
    }

    event.preventDefault()

    let nextIndex = index

    if (event.key === 'ArrowLeft') {
      nextIndex = Math.max(0, index - 1)
    }

    if (event.key === 'ArrowRight') {
      nextIndex = Math.min(currentIndex, index + 1)
    }

    if (event.key === 'Home') {
      nextIndex = 0
    }

    if (event.key === 'End') {
      nextIndex = currentIndex
    }

    stepButtons.current[nextIndex]?.focus()
  }

  return (
    <ol className={styles.indicator} aria-label="Прогресс настройки">
      {steps.map((step, index) => {
        const isCurrent = index === currentIndex
        const isAvailable = index <= currentIndex

        return (
          <li key={step.id}>
            <button
              ref={(element) => {
                stepButtons.current[index] = element
              }}
              className={`${styles.stepButton} ${isCurrent ? styles.current : ''}`}
              type="button"
              disabled={!isAvailable}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Шаг ${index + 1}: ${step.label}`}
              onClick={() => onStepChange(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span>{index + 1}</span>
              <span>{step.label}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
