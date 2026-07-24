import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the SPELLDROP header navigation', () => {
    const markup = renderToStaticMarkup(<App />)

    expect(markup).toContain('SPELLDROP')
    expect(markup).toContain('Как это работает')
    expect(markup).toContain('Работа доставки')
    expect(markup).toContain('aria-label="Основная навигация"')
    expect(markup).toContain('заклинаний')
    expect(markup).toContain('Подобрать заклинание')
    expect(markup).toContain('Служба доставки заклинаний')
    expect(markup).toContain('© 2026 SPELLDROP')
    expect(markup).not.toContain('Заказ №257')
    expect(markup).toContain('id="delivery-methods"')
    expect(markup).toContain('id="how-it-works"')
    expect(markup).toContain('Вы выбираете зелье — остальное делают ведьмочки')
    expect(markup).toContain('id="configurator"')
    expect(markup).toContain('Что сегодня пошло не по плану?')
    expect(markup).toContain('Шаг 1 из 4')
  })
})
