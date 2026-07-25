import { useEffect, useLayoutEffect, useRef, useReducer, useState, type CSSProperties } from 'react'
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
  ConfiguratorSelections,
  ConfiguratorStepId,
  DeliveryFeatureKind,
  DeliveryOption,
  SelectionValue,
  SingleSelectionField,
} from '../../types/configurator'
import { SelectionCard } from '../../ui/SelectionCard/SelectionCard'
import { SelectionGroup } from '../../ui/SelectionGroup/SelectionGroup'
import styles from './Configurator.module.css'
import { BottomSummary } from './BottomSummary'

const completionContentByDelivery = {
  normal: {
    title: 'Сова уже в пути',
    description: 'Мы отправили подтверждение и скоро покажем статус доставки.',
  },
  express: {
    title: 'Курьер уже в пути',
    description: 'Мы отправили подтверждение и скоро покажем статус доставки.',
  },
  teleport: {
    title: 'Закройте глаза на пару секунд',
    description: 'А теперь оглянитесь по сторонам — зелье уже появилось в ближайшем удобном месте, о котором вы подумали.',
    detail: 'Стол, полка, свободный стул или место за спиной — главное, чтобы там было достаточно пространства.',
  },
} as const

const getCompletionContent = (deliveryId: string | undefined) => {
  if (deliveryId === 'express' || deliveryId === 'teleport' || deliveryId === 'normal') {
    return completionContentByDelivery[deliveryId]
  }

  return completionContentByDelivery.normal
}

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

interface StepContentProps {
  view: ConfiguratorStepId
  selections: ConfiguratorSelections
  onSelectSingle: (field: SingleSelectionField, option: ConfiguratorOption) => void
  onToggleEffect: (option: ConfiguratorOption) => void
}

function StepContent({ view, selections, onSelectSingle, onToggleEffect }: StepContentProps) {
  if (view === 'situation') {
    return (
      <SelectionGroup legend="Выберите ситуацию">
        <div className={styles.optionGrid}>
          {situationOptions.map((option) => (
            <SelectionCard
              key={option.id}
              title={option.title}
              description={option.description}
              imageSrc={option.imageSrc}
              tone={option.tone}
              selected={isSelected(selections.situation, option)}
              onSelect={() => onSelectSingle('situation', option)}
            />
          ))}
        </div>
      </SelectionGroup>
    )
  }

  if (view === 'effects') {
    return (
      <SelectionGroup legend="Выберите дополнительные эффекты">
        <div className={styles.optionGrid}>
          {effectOptions.map((option) => {
            const selected = selections.effects.some((effect) => effect.id === option.id)
            const isLimitReached = selections.effects.length >= 3

            return (
              <SelectionCard
                key={option.id}
                title={option.title}
                description={option.description}
                imageSrc={option.imageSrc}
                tone={option.tone}
                selected={selected}
                disabled={isLimitReached && !selected}
                onSelect={() => onToggleEffect(option)}
              />
            )
          })}
        </div>
      </SelectionGroup>
    )
  }

  if (view === 'bottle') {
    return (
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
              selected={isSelected(selections.bottle, option)}
              onSelect={() => onSelectSingle('bottle', option)}
            />
          ))}
        </div>
      </SelectionGroup>
    )
  }

  return (
    <SelectionGroup legend="Выберите способ доставки">
      <div className={styles.deliveryList}>
        {deliveryOptions.map((option) => (
          <DeliveryCard
            key={option.id}
            option={option}
            selected={isSelected(selections.delivery, option)}
            onSelect={() => onSelectSingle('delivery', option)}
          />
        ))}
      </div>
    </SelectionGroup>
  )
}

export function Configurator() {
  const [state, dispatch] = useReducer(configuratorReducer, initialConfiguratorState)
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const configuratorInnerRef = useRef<HTMLDivElement>(null)
  const stepContentStackRef = useRef<HTMLDivElement>(null)
  const incomingContentRef = useRef<HTMLDivElement>(null)
  const shouldFocusStep = useRef(false)
  const completionTimerRef = useRef<number | null>(null)
  const displayedStepRef = useRef<ConfiguratorStepId>('situation')
  const [displayedStep, setDisplayedStep] = useState<ConfiguratorStepId>('situation')
  const [previousStep, setPreviousStep] = useState<ConfiguratorStepId | null>(null)
  const [isStepTransitioning, setIsStepTransitioning] = useState(false)
  const [transitionHeight, setTransitionHeight] = useState<number | null>(null)
  const [heightReserve, setHeightReserve] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)
  const [completionHeight, setCompletionHeight] = useState<number | null>(null)
  const isSuccess = state.currentView === 'success'
  const currentIndex = isSuccess
    ? configuratorSteps.length - 1
    : configuratorSteps.findIndex((step) => step.id === state.currentView)
  const currentStep = configuratorSteps[Math.max(0, currentIndex)]
  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === configuratorSteps.length - 1
  const summaryItems = getSummaryItems(state.selections)
  const completionContent = getCompletionContent(state.selections.delivery?.id)

  useEffect(
    () => () => {
      if (completionTimerRef.current !== null) {
        window.clearTimeout(completionTimerRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (!shouldFocusStep.current || isCompleting) {
      return
    }

    stepHeadingRef.current?.focus({ preventScroll: true })
    shouldFocusStep.current = false
  }, [isCompleting, state.currentView])

  useLayoutEffect(() => {
    if (!isSuccess || isCompleting) {
      return
    }

    stepHeadingRef.current?.focus({ preventScroll: true })
    shouldFocusStep.current = false
  }, [isCompleting, isSuccess])

  useLayoutEffect(() => {
    if (state.currentView === 'success' || state.currentView === displayedStepRef.current) {
      return
    }

    const nextStep = state.currentView
    const previous = displayedStepRef.current
    const previousHeight = stepContentStackRef.current?.getBoundingClientRect().height ?? null

    displayedStepRef.current = nextStep
    setIsStepTransitioning(false)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPreviousStep(null)
      setDisplayedStep(nextStep)
      setTransitionHeight(previousHeight)

      const reducedMotionFrame = window.requestAnimationFrame(() => {
        const nextHeight = incomingContentRef.current?.getBoundingClientRect().height ?? null

        if (previousHeight !== null && nextHeight !== null) {
          setHeightReserve((currentReserve) =>
            Math.max(0, previousHeight + currentReserve - nextHeight),
          )
        }

        setTransitionHeight(null)
      })

      return () => window.cancelAnimationFrame(reducedMotionFrame)
    }

    setTransitionHeight(previousHeight)
    setPreviousStep(previous)
    setDisplayedStep(nextStep)

    let heightFrame: number | undefined
    let timeout: number | undefined
    const initialFrame = window.requestAnimationFrame(() => {
      const nextHeight = incomingContentRef.current?.getBoundingClientRect().height ?? null

      heightFrame = window.requestAnimationFrame(() => {
        if (previousHeight !== null && nextHeight !== null) {
          // A shorter next step must not reduce the document height under a user
          // who is already at the bottom of the page. Reserve the difference below
          // the summary instead, where it cannot disturb the step composition.
          setHeightReserve((currentReserve) =>
            Math.max(0, previousHeight + currentReserve - nextHeight),
          )
        }
        setTransitionHeight(nextHeight)
        setIsStepTransitioning(true)
        timeout = window.setTimeout(() => {
          setPreviousStep(null)
          setIsStepTransitioning(false)
          setTransitionHeight(null)
        }, 240)
      })
    })

    return () => {
      window.cancelAnimationFrame(initialFrame)

      if (heightFrame !== undefined) {
        window.cancelAnimationFrame(heightFrame)
      }

      if (timeout !== undefined) {
        window.clearTimeout(timeout)
      }
    }
  }, [isSuccess, state.currentView])

  const goBack = () => {
    if (isFirstStep || isSuccess || isCompleting) {
      return
    }

    shouldFocusStep.current = true
    dispatch({ type: 'back' })
  }

  const goForward = () => {
    if (isSuccess || isCompleting) {
      return
    }

    shouldFocusStep.current = true

    if (isLastStep) {
      const completedHeight = configuratorInnerRef.current?.getBoundingClientRect().height ?? null

      setCompletionHeight(completedHeight)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        dispatch({ type: 'complete' })
        return
      }

      setIsCompleting(true)
      completionTimerRef.current = window.setTimeout(() => {
        dispatch({ type: 'complete' })
        setIsCompleting(false)
        completionTimerRef.current = null
      }, 280)
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

  const resetConfigurator = () => {
    displayedStepRef.current = 'situation'
    setDisplayedStep('situation')
    setPreviousStep(null)
    setIsStepTransitioning(false)
    setTransitionHeight(null)
    setHeightReserve(0)
    setIsCompleting(false)
    setCompletionHeight(null)
    dispatch({ type: 'reset' })
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

    return Boolean(state.selections.delivery) && !isCompleting
  })()

  const formContent = (
    <div ref={configuratorInnerRef} className={styles.inner}>
      <div className={styles.stepHeader}>
        <h2
          id={isCompleting ? undefined : 'configurator-title'}
          ref={isCompleting ? undefined : stepHeadingRef}
          tabIndex={-1}
        >
          {currentStep.title}
        </h2>
        <p className={styles.description}>{currentStep.description}</p>
        <p className={styles.stepCount} aria-live="polite">
          Шаг {currentIndex + 1} из {configuratorSteps.length}
        </p>
      </div>

      <div className={styles.stepPanel} aria-live="polite">
        <div
          ref={stepContentStackRef}
          className={styles.stepContentStack}
          data-step-content-stack
          style={transitionHeight === null ? undefined : { height: `${transitionHeight}px` }}
        >
          {previousStep ? (
            <div
              className={`${styles.stepContent} ${styles.stepContentExiting} ${
                isStepTransitioning ? styles.stepContentTransitioning : ''
              }`}
              aria-hidden="true"
              data-step-content="outgoing"
              inert
            >
              <StepContent
                view={previousStep}
                selections={state.selections}
                onSelectSingle={selectSingle}
                onToggleEffect={toggleEffect}
              />
            </div>
          ) : null}
          <div
            ref={incomingContentRef}
            className={`${styles.stepContent} ${
              previousStep ? styles.stepContentEntering : ''
            } ${isStepTransitioning ? styles.stepContentTransitioning : ''}`}
            data-step-content="incoming"
          >
            <StepContent
              view={displayedStep}
              selections={state.selections}
              onSelectSingle={selectSingle}
              onToggleEffect={toggleEffect}
            />
          </div>
        </div>
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
  )

  if (isSuccess || isCompleting) {
    return (
      <section id="configurator" className={styles.configurator} tabIndex={-1} aria-labelledby="configurator-title">
        <div className={styles.completionStack} style={completionHeight === null ? undefined : { height: `${completionHeight}px` }}>
          {isCompleting ? (
            <div className={styles.completionForm} data-completion="form" aria-hidden="true" inert>
              {formContent}
            </div>
          ) : null}
          <div
            className={`${styles.successState} ${isCompleting ? styles.successStateEntering : ''}`}
            data-completion="success"
          >
            <img src={configuratorAssets.mascot.alternative} alt="" />
            <p className={styles.stepCount}>Заказ принят</p>
            <h2 id="configurator-title" ref={stepHeadingRef} tabIndex={-1}>
              {completionContent.title}
            </h2>
            <p>{completionContent.description}</p>
            {'detail' in completionContent ? <p className={styles.successDetail}>{completionContent.detail}</p> : null}
            <button type="button" onClick={resetConfigurator}>
              Собрать новое зелье
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="configurator"
      className={styles.configurator}
      style={{ '--step-height-reserve': `${heightReserve}px` } as CSSProperties}
      tabIndex={-1}
      aria-labelledby="configurator-title"
    >
      {formContent}
    </section>
  )
}
