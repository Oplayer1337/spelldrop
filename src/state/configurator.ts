import { configuratorSteps } from '../data/configurator'
import type {
  ConfiguratorAction,
  ConfiguratorSelections,
  ConfiguratorState,
  ConfiguratorStepId,
  SelectionValue,
} from '../types/configurator'

export const initialConfiguratorState: ConfiguratorState = {
  currentView: 'situation',
  selections: {
    effects: [],
  },
}

const getStepIndex = (stepId: ConfiguratorStepId) =>
  configuratorSteps.findIndex((step) => step.id === stepId)

const updateSingleSelection = (
  selections: ConfiguratorSelections,
  field: 'situation' | 'bottle' | 'delivery',
  value: SelectionValue,
): ConfiguratorSelections => ({
  ...selections,
  [field]: value,
})

export function configuratorReducer(
  state: ConfiguratorState,
  action: ConfiguratorAction,
): ConfiguratorState {
  const currentIndex =
    state.currentView === 'success' ? configuratorSteps.length : getStepIndex(state.currentView)

  switch (action.type) {
    case 'advance': {
      if (currentIndex < 0 || currentIndex >= configuratorSteps.length - 1) {
        return state
      }

      return {
        ...state,
        currentView: configuratorSteps[currentIndex + 1].id,
      }
    }

    case 'back': {
      if (currentIndex <= 0) {
        return state
      }

      return {
        ...state,
        currentView: configuratorSteps[currentIndex - 1].id,
      }
    }

    case 'goToStep': {
      const targetIndex = getStepIndex(action.stepId)

      if (targetIndex < 0 || targetIndex > currentIndex) {
        return state
      }

      return {
        ...state,
        currentView: action.stepId,
      }
    }

    case 'selectSingle':
      return {
        ...state,
        selections: updateSingleSelection(state.selections, action.field, action.value),
      }

    case 'toggleEffect': {
      const isSelected = state.selections.effects.some((effect) => effect.id === action.value.id)

      if (isSelected) {
        return {
          ...state,
          selections: {
            ...state.selections,
            effects: state.selections.effects.filter((effect) => effect.id !== action.value.id),
          },
        }
      }

      if (state.selections.effects.length >= 3) {
        return state
      }

      return {
        ...state,
        selections: {
          ...state.selections,
          effects: [...state.selections.effects, action.value],
        },
      }
    }

    case 'complete':
      return {
        ...state,
        currentView: 'success',
      }

    case 'reset':
      return initialConfiguratorState

    default:
      return state
  }
}

export function getSummaryItems(selections: ConfiguratorSelections): SelectionValue[] {
  return [
    selections.situation,
    ...selections.effects,
    selections.bottle,
    selections.delivery,
  ].filter((item): item is SelectionValue => item !== undefined)
}
