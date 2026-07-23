import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'short-desktop', width: 1366, height: 768 },
  { name: 'desktop-900', width: 1440, height: 900 },
  { name: 'desktop', width: 1440, height: 1000 },
]

for (const viewport of viewports) {
  test(`header fits the ${viewport.name} viewport`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Доставка заклинаний' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Подобрать заклинание' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Что сегодня пошло не по плану?' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Перейти к доставке' })).toBeVisible()
    await page.getByRole('button', { name: /^Потерялась вещь/ }).click()
    await expect(page.getByRole('button', { name: /^Потерялась вещь/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true)

    await page.screenshot({
      path: testInfo.outputPath(`header-${viewport.name}.png`),
      fullPage: true,
    })
  })
}

test('mobile navigation can be opened with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const menuButton = page.getByRole('button', { name: 'Открыть меню' })
  await menuButton.focus()
  await page.keyboard.press('Enter')

  await expect(page.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await expect(page.getByRole('navigation')).toBeVisible()
})

test('hero CTA focuses the configurator target', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.getByRole('button', { name: 'Подобрать заклинание' }).click()
  await expect(page.locator('#configurator')).toBeFocused()
})

test('configurator moves between steps and returns focus to the step heading', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.getByRole('button', { name: /^Потерялась вещь/ }).click()
  await page.getByRole('button', { name: 'Показать зелья' }).click()
  const effectsHeading = page.getByRole('heading', { name: 'Какие доп. эффекты нужны?' })

  await expect(effectsHeading).toBeFocused()
  await page.getByRole('button', { name: 'Назад' }).click()
  await expect(page.getByRole('heading', { name: 'Что сегодня пошло не по плану?' })).toBeFocused()
})

test('completed configurator steps can be revisited with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.getByRole('button', { name: /^Потерялась вещь/ }).click()
  await page.getByRole('button', { name: 'Показать зелья' }).click()
  const backButton = page.getByRole('button', { name: 'Назад' })

  await backButton.focus()
  await page.keyboard.press('Enter')

  await expect(page.getByRole('heading', { name: 'Что сегодня пошло не по плану?' })).toBeFocused()
})

test('configurator maps selections into the summary and completes delivery', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await page.getByRole('button', { name: /^Потерялась вещь/ }).click()
  await expect(page.getByText('Потерялась вещь', { exact: true }).last()).toBeVisible()
  await page.getByRole('button', { name: 'Показать зелья' }).click()

  await page.getByRole('button', { name: /^Быстрый эффект/ }).click()
  await page.getByRole('button', { name: 'Выбрать флакон' }).click()

  await page.getByRole('button', { name: /^M — Средний/ }).click()
  await page.getByRole('button', { name: 'Перейти к доставке' }).click()

  await page.getByRole('button', { name: /^Экспресс/ }).click()
  await page.getByRole('button', { name: 'Вызвать курьера' }).click()

  await expect(page.getByRole('heading', { name: 'Курьер уже в пути' })).toBeFocused()
})

test('captures each mapped configurator step', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 960 })
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const configurator = page.locator('#configurator')
  await page.getByRole('button', { name: /^Потерялась вещь/ }).click()
  await configurator.screenshot({ path: testInfo.outputPath('configurator-situation.png') })

  await page.getByRole('button', { name: 'Показать зелья' }).click()
  await page.getByRole('button', { name: /^Быстрый эффект/ }).click()
  await configurator.screenshot({ path: testInfo.outputPath('configurator-effects.png') })

  await page.getByRole('button', { name: 'Выбрать флакон' }).click()
  await page.getByRole('button', { name: /^M — Средний/ }).click()
  await configurator.screenshot({ path: testInfo.outputPath('configurator-bottle.png') })

  await page.getByRole('button', { name: 'Перейти к доставке' }).click()
  await page.getByRole('button', { name: /^Экспресс/ }).click()
  await configurator.screenshot({ path: testInfo.outputPath('configurator-delivery.png') })
})

test('captures compact configurator layouts at desktop heights', async ({ page }, testInfo) => {
  const compactViewports = [
    { name: '1440x900', width: 1440, height: 900, maximumSectionHeight: 900 },
    // Short desktop screens may require a small natural scroll to reveal the section padding.
    { name: '1366x768', width: 1366, height: 768, maximumSectionHeight: 816 },
  ]

  for (const viewport of compactViewports) {
    await page.setViewportSize(viewport)
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.getByRole('button', { name: /^Потерялась вещь/ }).click()

    const configurator = page.locator('#configurator')
    const bounds = await configurator.boundingBox()

    expect(bounds).not.toBeNull()
    expect(bounds?.height).toBeLessThanOrEqual(viewport.maximumSectionHeight)
    await configurator.screenshot({ path: testInfo.outputPath(`configurator-${viewport.name}.png`) })
  }
})
