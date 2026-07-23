export const configuratorStepIds = ['situation', 'effects', 'bottle', 'delivery'] as const

export type ConfiguratorStepId = (typeof configuratorStepIds)[number]

export type ConfiguratorView = ConfiguratorStepId | 'success'

export interface SelectionValue {
  id: string
  label: string
  imageSrc?: string
}

export type SelectionTone =
  | 'green'
  | 'violet'
  | 'blue'
  | 'orange'
  | 'olive'
  | 'cyan'
  | 'pink'

export interface ConfiguratorOption extends SelectionValue {
  title: string
  description: string
  imageSrc: string
  tone: SelectionTone
}

export type DeliveryFeatureKind = 'time' | 'coin' | 'care' | 'priority' | 'magic'

export interface DeliveryOption extends ConfiguratorOption {
  subtitle: string
  features: Array<{
    kind: DeliveryFeatureKind
    text: string
    emphasis?: boolean
  }>
  eta: {
    prefix: string
    lines: string[]
    emphasis?: string
  }
}

export interface ConfiguratorSelections {
  situation?: SelectionValue
  effects: SelectionValue[]
  bottle?: SelectionValue
  delivery?: SelectionValue
}

export interface ConfiguratorState {
  currentView: ConfiguratorView
  selections: ConfiguratorSelections
}

export interface ConfiguratorStepDefinition {
  id: ConfiguratorStepId
  label: string
  title: string
  description: string
  nextLabel: string
}

export type SingleSelectionField = 'situation' | 'bottle' | 'delivery'

export type ConfiguratorAction =
  | { type: 'advance' }
  | { type: 'back' }
  | { type: 'goToStep'; stepId: ConfiguratorStepId }
  | { type: 'selectSingle'; field: SingleSelectionField; value: SelectionValue }
  | { type: 'toggleEffect'; value: SelectionValue }
  | { type: 'complete' }
  | { type: 'reset' }
