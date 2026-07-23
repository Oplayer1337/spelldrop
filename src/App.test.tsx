import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the SPELLDROP header navigation', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('SPELLDROP')
    expect(markup).toContain('Каталог')
    expect(markup).toContain('Как это работает')
    expect(markup).toContain('Доставка')
    expect(markup).toContain('aria-label="Основная навигация"')
    expect(markup).toContain('Доставка')
    expect(markup).toContain('заклинаний')
    expect(markup).toContain('Подобрать заклинание')
    expect(markup).toContain('id="configurator"')
    expect(markup).toContain('Что сегодня пошло не по плану?')
    expect(markup).toContain('Шаг 1 из 4')
  })
})
