import { configuratorAssets } from './assets'
import type {
  ConfiguratorOption,
  ConfiguratorStepDefinition,
  DeliveryOption,
} from '../types/configurator'

export const configuratorSteps: readonly ConfiguratorStepDefinition[] = [
  {
    id: 'situation',
    label: 'Ситуация',
    title: 'Что сегодня пошло не по плану?',
    description: 'Выберите ситуацию — подберём нужное зелье.',
    nextLabel: 'Показать зелья',
  },
  {
    id: 'effects',
    label: 'Эффекты',
    title: 'Какие доп. эффекты нужны?',
    description: 'Выберите 1–3 опции — затем подберём форму флакона.',
    nextLabel: 'Выбрать флакон',
  },
  {
    id: 'bottle',
    label: 'Флакон',
    title: 'Какой флакон нужен?',
    description: 'Выберите размер флакона — затем оформим заказ.',
    nextLabel: 'Перейти к доставке',
  },
  {
    id: 'delivery',
    label: 'Доставка',
    title: 'Как доставить зелье?',
    description: 'Выберите способ доставки — и мы отправим ваше зелье.',
    nextLabel: 'Вызвать курьера',
  },
]

export const situationOptions: readonly ConfiguratorOption[] = [
  {
    id: 'lost-item',
    label: 'Потерялась вещь',
    title: 'Потерялась вещь',
    description: 'Найти то, что где-то потерялось',
    imageSrc: configuratorAssets.situations.lostItem,
    tone: 'green',
  },
  {
    id: 'inspiration',
    label: 'Пропало вдохновение',
    title: 'Пропало вдохновение',
    description: 'Вернуть идеи и мотивацию',
    imageSrc: configuratorAssets.situations.inspiration,
    tone: 'violet',
  },
  {
    id: 'awkward-pause',
    label: 'Неловкая пауза',
    title: 'Неловкая пауза',
    description: 'Сказать нужные слова',
    imageSrc: configuratorAssets.situations.awkwardPause,
    tone: 'blue',
  },
  {
    id: 'calm-dragon',
    label: 'Успокоить дракона',
    title: 'Успокоить дракона',
    description: 'Снять напряжение и гнев',
    imageSrc: configuratorAssets.situations.calmDragon,
    tone: 'orange',
  },
  {
    id: 'grow-plant',
    label: 'Ничего не растёт',
    title: 'Ничего не растёт',
    description: 'Помочь делу сдвинуться с места',
    imageSrc: configuratorAssets.situations.growPlant,
    tone: 'olive',
  },
  {
    id: 'other',
    label: 'Другая странная ситуация',
    title: 'Другая странная ситуация',
    description: 'У меня особый случай',
    imageSrc: configuratorAssets.situations.other,
    tone: 'cyan',
  },
]

export const effectOptions: readonly ConfiguratorOption[] = [
  {
    id: 'fast',
    label: 'Быстрый эффект',
    title: 'Быстрый эффект',
    description: 'Действует сразу, без ожидания',
    imageSrc: configuratorAssets.effects.fast,
    tone: 'green',
  },
  {
    id: 'long-lasting',
    label: 'Долгое действие',
    title: 'Долгое действие',
    description: 'Эффект держится дольше',
    imageSrc: configuratorAssets.effects.longLasting,
    tone: 'violet',
  },
  {
    id: 'safe',
    label: 'Без побочек',
    title: 'Без побочек',
    description: 'Мягкое действие без вреда',
    imageSrc: configuratorAssets.effects.safe,
    tone: 'blue',
  },
  {
    id: 'glow',
    label: 'Лёгкое свечение',
    title: 'Лёгкое свечение',
    description: 'Нежное свечение при действии',
    imageSrc: configuratorAssets.effects.glow,
    tone: 'orange',
  },
  {
    id: 'silent',
    label: 'Тихое применение',
    title: 'Тихое применение',
    description: 'Без шума и лишнего внимания',
    imageSrc: configuratorAssets.effects.silent,
    tone: 'cyan',
  },
  {
    id: 'aroma',
    label: 'Приятный аромат',
    title: 'Приятный аромат',
    description: 'Лёгкий и приятный запах',
    imageSrc: configuratorAssets.effects.aroma,
    tone: 'pink',
  },
]

export const bottleOptions: readonly ConfiguratorOption[] = [
  {
    id: 'small',
    label: 'Маленький',
    title: 'S — Маленький',
    description: 'Компактный и удобный',
    imageSrc: configuratorAssets.bottles.small,
    tone: 'green',
  },
  {
    id: 'medium',
    label: 'Средний',
    title: 'M — Средний',
    description: 'Оптимальный вариант',
    imageSrc: configuratorAssets.bottles.medium,
    tone: 'violet',
  },
  {
    id: 'large',
    label: 'Большой',
    title: 'L — Большой',
    description: 'Больше объём, дольше хватит',
    imageSrc: configuratorAssets.bottles.large,
    tone: 'blue',
  },
]

export const deliveryOptions: readonly DeliveryOption[] = [
  {
    id: 'normal',
    label: 'Обычная',
    title: 'Обычная',
    subtitle: 'Совинная почта',
    description: 'Надёжно и неторопливо',
    imageSrc: configuratorAssets.delivery.normal,
    tone: 'violet',
    features: [
      { kind: 'time', text: 'Доставим до следующего заката' },
      { kind: 'coin', text: 'Бесплатно' },
      { kind: 'care', text: 'Аккуратно и бережно' },
    ],
    eta: { prefix: 'Прибудет', lines: ['к 20:00', 'завтра'] },
  },
  {
    id: 'express',
    label: 'Экспресс',
    title: 'Экспресс',
    subtitle: 'Ведьмин курьер',
    description: 'Быстро и безопасно',
    imageSrc: configuratorAssets.delivery.express,
    tone: 'orange',
    features: [
      { kind: 'time', text: 'Доставим в течение 1 часа' },
      { kind: 'coin', text: '+4 золотых', emphasis: true },
      { kind: 'priority', text: 'Приоритетная доставка' },
    ],
    eta: { prefix: 'Прибудет через', lines: ['45 мин'], emphasis: '45 мин' },
  },
  {
    id: 'teleport',
    label: 'Телепорт',
    title: 'Телепорт',
    subtitle: 'Мгновенная доставка',
    description: 'Магия на грани возможного',
    imageSrc: configuratorAssets.delivery.teleport,
    tone: 'violet',
    features: [
      { kind: 'magic', text: 'Доставим за 10–15 минут' },
      { kind: 'coin', text: '+9 золотых', emphasis: true },
      { kind: 'magic', text: 'Самый быстрый способ' },
    ],
    eta: { prefix: 'Прибудет почти', lines: ['мгновенно'], emphasis: 'мгновенно' },
  },
]
