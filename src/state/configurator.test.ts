import { describe, expect, it } from 'vitest'
import { configuratorReducer, getSummaryItems, initialConfiguratorState } from './configurator'

describe('configuratorReducer', () => {
  it('keeps compatible choices while moving backward and forward', () => {
    const selectedSituation = configuratorReducer(initialConfiguratorState, {
      type: 'selectSingle',
      field: 'situation',
      value: { id: 'lost-item', label: 'Потерялась вещь' },
    })
    const effectsStep = configuratorReducer(selectedSituation, { type: 'advance' })
    const selectedEffect = configuratorReducer(effectsStep, {
      type: 'toggleEffect',
      value: { id: 'fast', label: 'Быстрый эффект' },
    })
    const previousStep = configuratorReducer(selectedEffect, { type: 'back' })
    const returnedStep = configuratorReducer(previousStep, { type: 'advance' })

    expect(returnedStep.currentView).toBe('effects')
    expect(returnedStep.selections.situation?.label).toBe('Потерялась вещь')
    expect(returnedStep.selections.effects).toEqual([{ id: 'fast', label: 'Быстрый эффект' }])
  })

  it('limits effects to three selections and exposes selected summary items', () => {
    const selectedEffects = ['fast', 'lasting', 'safe', 'glow'].reduce(
      (state, id) =>
        configuratorReducer(state, {
          type: 'toggleEffect',
          value: { id, label: id },
        }),
      initialConfiguratorState,
    )

    expect(selectedEffects.selections.effects).toHaveLength(3)
    expect(getSummaryItems(selectedEffects.selections).map((item) => item.id)).toEqual([
      'fast',
      'lasting',
      'safe',
    ])
  })
})
