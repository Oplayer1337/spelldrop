import { useEffect, useReducer, useRef } from 'react'
import { configuratorAssets } from '../../data/assets'
import {
  bottleOptions,
  configuratorSteps,
  deliveryOptions,
  effectOptions,
  situationOptions,
} from '../../data/configurator'
import { configuratorReducer, getSummaryItems, initialConfiguratorState } from '../../state/configurator'
import type {
  ConfiguratorOption,
  DeliveryFeatureKind,
  DeliveryOption,
  SelectionValue,
  SingleSelectionField,
} from '../../types/configurator'
import { SelectionCard } from '../../ui/SelectionCard/SelectionCard'
import { SelectionGroup } from '../../ui/SelectionGroup/SelectionGroup'
import styles from './Configurator.module.css'
import { BottomSummary } from './BottomSummary'

const toSelectionValue = (option: ConfiguratorOption): SelectionValue => ({
  id: option.id,
  label: option.label,
  imageSrc: option.imageSrc,
})

const isSelected = (value: SelectionValue | undefined, option: ConfiguratorOption) =>
  value?.id === option.id

interface DeliveryCardProps {
  option: DeliveryOption
  selected: boolean
  onSelect: () => void
}

function DeliveryCard({ option, selected, onSelect }: DeliveryCardProps) {
  return (
    <button
      className={styles.deliveryCard}
      type="button"
      aria-pressed={selected}
      data-tone={option.tone}
      onClick={onSelect}
    >
      <span className={styles.deliveryArtwork}>
        <img src={option.imageSrc} alt="" />
      </span>
      <span className={styles.deliveryIdentity}>
        <strong>{option.title}</strong>
        <span>{option.subtitle}</span>
        <small>{option.description}</small>
      </span>
      <span className={styles.deliveryFeatures}>
        {option.features.map((feature) => (
          <span key={`${feature.kind}-${feature.text}`} className={styles.deliveryFeature}>
            <DeliveryFeatureIcon kind={feature.kind} />
            <span className={feature.emphasis ? styles.emphasizedFeature : ''}>{feature.text}</span>
          </span>
        ))}
      </span>
      <span className={styles.deliveryEta}>
        <small>{option.eta.prefix}</small>
        {option.eta.lines.map((line) => (
          <strong key={line} className={line === option.eta.emphasis ? styles.emphasizedEta : ''}>
            {line}
          </strong>
        ))}
      </span>
      <span className={styles.deliveryCheckmark} aria-hidden="true" />
    </button>
  )
}

function DeliveryFeatureIcon({ kind }: { kind: DeliveryFeatureKind }) {
  if (kind === 'coin') {
    return <img className={styles.coinIcon} src={configuratorAssets.delivery.coin} alt="" />
  }

  return <span className={styles.featureIcon} data-kind={kind} aria-hidden="true" />
}

export function Configurator() {
  const [state, dispatch] = useReducer(configuratorReducer, initialConfiguratorState)
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const shouldFocusStep = useRef(false)
  const isSuccess = state.currentView === 'success'
  const currentIndex = isSuccess
    ? configuratorSteps.length - 1
    : configuratorSteps.findIndex((step) => step.id === state.currentView)
  const currentStep = configuratorSteps[Math.max(0, currentIndex)]
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === configuratorSteps.length - 1
  const summaryItems = getSummaryItems(state.selections)

  useEffect(() => {
    if (!shouldFocusStep.current) {
      return
    }

    stepHeadingRef.current?.focus()
    shouldFocusStep.current = false
  }, [state.currentView])

  const goBack = () => {
    if (isFirstStep || isSuccess) {
      return
    }

    shouldFocusStep.current = true
    dispatch({ type: 'back' })
  }

  const goForward = () => {
    if (isSuccess) {
      return
    }

    shouldFocusStep.current = true

    if (isLastStep) {
      dispatch({ type: 'complete' })
      return
    }

    dispatch({ type: 'advance' })
  }

  const selectSingle = (field: SingleSelectionField, option: ConfiguratorOption) => {
    dispatch({ type: 'selectSingle', field, value: toSelectionValue(option) })
  }

  const toggleEffect = (option: ConfiguratorOption) => {
    dispatch({ type: 'toggleEffect', value: toSelectionValue(option) })
  }

  const canProceed = (() => {
    if (isSuccess) {
      return false
    }

    if (state.currentView === 'situation') {
      return Boolean(state.selections.situation)
    }

    if (state.currentView === 'effects') {
      return state.selections.effects.length > 0
    }

    if (state.currentView === 'bottle') {
      return Boolean(state.selections.bottle)
    }

    return Boolean(state.selections.delivery)
  })()

  if (isSuccess) {
    return (
      <section id="configurator" className={styles.configurator} tabIndex={-1} aria-labelledby="configurator-title">
        <div className={`${styles.inner} ${styles.successState}`}>
          <img src={configuratorAssets.mascot.alternative} alt="" />
          <p className={styles.stepCount}>Заказ принят</p>
          <h2 id="configurator-title" ref={stepHeadingRef} tabIndex={-1}>
            Курьер уже в пути
          </h2>
          <p>Мы отправили подтверждение и скоро покажем статус доставки.</p>
          <button type="button" onClick={() => dispatch({ type: 'reset' })}>
            Собрать новое зелье
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="configurator" className={styles.configurator} tabIndex={-1} aria-labelledby="configurator-title">
      <div className={styles.inner}>
        <div className={styles.stepHeader}>
          <h2 id="configurator-title" ref={stepHeadingRef} tabIndex={-1}>
            {currentStep.title}
          </h2>
          <p className={styles.description}>{currentStep.description}</p>
          <p className={styles.stepCount} aria-live="polite">
            Шаг {currentIndex + 1} из {configuratorSteps.length}
          </p>
        </div>

        <div key={currentStep.id} className={styles.stepPanel} aria-live="polite">
          {state.currentView === 'situation' ? (
            <SelectionGroup legend="Выберите ситуацию">
              <div className={styles.optionGrid}>
                {situationOptions.map((option) => (
                  <SelectionCard
                    key={option.id}
                    title={option.title}
                    description={option.description}
                    imageSrc={option.imageSrc}
                    tone={option.tone}
                    selected={isSelected(state.selections.situation, option)}
                    onSelect={() => selectSingle('situation', option)}
                  />
                ))}
              </div>
            </SelectionGroup>
          ) : null}

          {state.currentView === 'effects' ? (
            <SelectionGroup legend="Выберите дополнительные эффекты">
              <div className={styles.optionGrid}>
                {effectOptions.map((option) => {
                  const selected = state.selections.effects.some((effect) => effect.id === option.id)
                  const isLimitReached = state.selections.effects.length >= 3

                  return (
                    <SelectionCard
                      key={option.id}
                      title={option.title}
                      description={option.description}
                      imageSrc={option.imageSrc}
                      tone={option.tone}
                      selected={selected}
                      disabled={isLimitReached && !selected}
                      onSelect={() => toggleEffect(option)}
                    />
                  )
                })}
              </div>
            </SelectionGroup>
          ) : null}

          {state.currentView === 'bottle' ? (
            <SelectionGroup legend="Выберите размер флакона">
              <div className={`${styles.optionGrid} ${styles.bottleGrid}`}>
                {bottleOptions.map((option) => (
                  <SelectionCard
                    key={option.id}
                    title={option.title}
                    description={option.description}
                    imageSrc={option.imageSrc}
                    tone={option.tone}
                    variant="bottle"
                    selected={isSelected(state.selections.bottle, option)}
                    onSelect={() => selectSingle('bottle', option)}
                  />
                ))}
              </div>
            </SelectionGroup>
          ) : null}

          {state.currentView === 'delivery' ? (
            <SelectionGroup legend="Выберите способ доставки">
              <div className={styles.deliveryList}>
                {deliveryOptions.map((option) => (
                  <DeliveryCard
                    key={option.id}
                    option={option}
                    selected={isSelected(state.selections.delivery, option)}
                    onSelect={() => selectSingle('delivery', option)}
                  />
                ))}
              </div>
            </SelectionGroup>
          ) : null}
        </div>

        <BottomSummary
          items={summaryItems}
          isFirstStep={isFirstStep}
          canProceed={canProceed}
          nextLabel={currentStep.nextLabel}
          mascotSrc={
            state.currentView === 'delivery'
              ? configuratorAssets.mascot.alternative
              : configuratorAssets.mascot.default
          }
          mascotPosition={state.currentView === 'delivery' ? 'right' : 'left'}
          onBack={goBack}
          onNext={goForward}
        />
      </div>
    </section>
  )
}
