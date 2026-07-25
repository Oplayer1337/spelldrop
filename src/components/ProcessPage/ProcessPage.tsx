import { configuratorAssets } from '../../data/assets'
import type { ReactNode } from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import styles from './ProcessPage.module.css'

const roles = [
  'Роль — Product / Web Designer',
  'Дизайн — Figma + ImageGen',
  'Разработка — Codex',
  'Стек — React, TypeScript, Vite',
]

const fixes = [
  {
    title: 'Ассеты',
    text: 'Codex не сразу сопоставил реальные имена файлов с вариантами конфигуратора, поэтому внутри появился placeholder. Сначала я просил просканировать директории и создать единый asset manifest.',
  },
  {
    title: 'Анимация',
    text: 'При выборе элементов экран дёргался вверх, что-то съезжало или дергалось. После отдельной проверки переходы были заменены на короткий fade без изменения scroll-позиции, а всякие мелкие фиксы были сделаны вручную',
  },
  {
    title: 'Отображение',
    text: 'На невысоких экранах конфигуратор не помещался целиком. Я уменьшил вертикальные интервалы и размеры карточек, не масштабируя всю страницу.',
  },
  {
    title: 'Телепорт',
    text: 'После выбора телепорта интерфейс всё равно писал, что курьер(!!) находится в пути. Итоговый текст был связан с выбранной доставкой.',
  },
]

function Section({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`${styles.section} ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export function ProcessPage() {
  return (
    <div className="page-shell">
      <Header isProcessPage />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="process-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>AI WORKLOG</p>
            <h1 id="process-title">Как создавался SPELLDROP</h1>
            <p className={styles.intro}>
              От разбора задания и первых референсов до работающего лендинга, собранного с помощью
              ImageGen, Codex и серии небольших итераций.
            </p>
            <ul className={styles.roles}>
              {roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            {/*<a className={styles.backLink} href="/">*/}
            {/*  Открыть SPELLDROP*/}
            {/*</a>*/}
          </div>
          <div className={styles.heroArtwork} aria-hidden="true">
            <img className={styles.heroWitch} src={configuratorAssets.mascot.default} alt="" />
            <img className={styles.heroBottle} src={configuratorAssets.bottles.medium} alt="" />
            <img className={styles.heroEffect} src={configuratorAssets.effects.fast} alt="" />
          </div>
        </section>

        <div className={styles.content}>
          <Section title="От заклинаний к зельям" className={styles.ideaSection}>
            <div className={styles.proseWithAssets}>
              <div>
                <p>
                  Я начал с разбора задания и сбора референсов, и спонтанно взял заоснову визуального направления
                  образ девчонки с фиолетовыми волосами из Duolingo — мне понравась задумка детского материал стиля, а также
                  сам яркий персонаж и дружелюбная product-style подача.
                </p>
                <p>
                  Заклинания же я решил представить в виде зелий, тк заклинание у нас довольно абстрактная
                  вещь, зелье воспринимается как понятный физический продукт: его можно выбрать,
                  настроить, упаковать и доставить.
                </p>
                <p>
                  Так появилась основная идея для SPELLDROP, где пользователь собирает подходящее зелье, а
                  ведьмочки производят и доставляют его.
                </p>
              </div>
              <div className={styles.potionCluster} aria-hidden="true">
                <img src={configuratorAssets.effects.glow} alt="" />
                <img src={configuratorAssets.effects.aroma} alt="" />
                <img src={configuratorAssets.bottles.small} alt="" />
              </div>
            </div>
          </Section>

          <Section title="Разбор экспириенса и архитектура">
            <div className={styles.narrowProse}>
              <p>После выбора идеи я начал продумывать архитектуру лендинга и пользовательский сценарий.</p>
              <p>
                Главным интерактивным элементом стал конфигуратор, позволяющий пользователю выбирать ситуацию,
                добавлять эффекты, подбирать размер флакона и способ доставки.
              </p>
              <p>
                Мне не хотелось делать обычный каталог, как по мне интереснее создать ощущение, что
                продукт собирается специально под конкретную ситуацию пользователя, особенно учитывая магическую основу проекта
              </p>
            </div>
            <ol className={styles.flow} aria-label="Сценарий конфигуратора">
              {['Ситуация', 'Эффекты', 'Флакон', 'Доставка'].map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Section>

          <Section title="Почему оплата кармой?" className={styles.karmaSection}>
            <div className={styles.karmaLayout}>
              <div className={styles.narrowProse}>
                <p>Отдельно нужно было придумать, как пользователь расплачивается за магию.</p>
                <p>
                  Я не хотел создавать сложную фантазийную валюту и отдельно объяснять экономику
                  вымышленного мира. Поэтому выбрал карму — это понятное решение, которое хорошо
                  связывается с концепцией задания и поддерживает лёгкий юмористический тон.
                  Золотые же являются валютой доставки, которые магически телепортируются в сервис
                  после заказа.
                </p>
                <blockquote>Это настоящая магия! Даже подтверждать ничего не нужно</blockquote>
              </div>
              <div className={styles.karmaArtwork} aria-hidden="true">
                <img src={configuratorAssets.effects.aroma} alt="" />
                <img src={configuratorAssets.delivery.coin} alt="" />
              </div>
            </div>
          </Section>

          <Section title="Добиваем визуальное направление">
            <div className={styles.narrowProse}>
              <p>После архитектуры и первых фреймов я начал собирать референсные экраны с помощью ImageGen.</p>
              <p>
                Первые варианты часто получались слишком сказочными и перегруженными: модель добавляла
                лаборатории, замки, книги, сложные фоны, неон и fantasy-шрифты.
              </p>
              <p>
                Постепенно я зафиксировал более строгий стиль: чистый тёмный фон, один геометрический
                шрифт, простые material-style ассеты и минимум лишнего декора.
              </p>
              <p>
                ImageGen использовался не для создания готового сайта целиком, а для поиска композиции,
                персонажей и отдельных визуальных элементов.
              </p>
            </div>
          </Section>

          <Section title="Подготовка ассетов" className={styles.assetsSection}>
            <div className={styles.narrowProse}>
              <p>
                Из референсных экранов я начал собирать отдельные ассеты: ведьмочку, зелья, ситуации,
                эффекты и способы доставки.
              </p>
              <p>Часть объектов я правил самостоятельно, часть повторно отдавал на генерацию.</p>
              <p>
                Интерфейсные элементы не использовались как готовые картинки!! Карточки, кнопки, состояния
                выбора и сетки были реализованы в коде, а ассеты использовались только как иллюстрации!
              </p>
            </div>
            <div className={styles.assetShelf} aria-hidden="true">
              <img src={configuratorAssets.situations.inspiration} alt="" />
              <img src={configuratorAssets.effects.safe} alt="" />
              <img src={configuratorAssets.delivery.express} alt="" />
              <img src={configuratorAssets.bottles.large} alt="" />
            </div>
          </Section>

          <Section title="Как я передавал дизайн в разработку" className={styles.codexSection}>
            <div className={styles.docs}>
              <article>
                <strong>AGENTS.md</strong>
                <p>Правила архитектуры, ограничения и требования к проекту.</p>
              </article>
              <article>
                <strong>DESIGN.md</strong>
                <p>Визуальный стиль, типографика, цвета и состояния компонентов.</p>
              </article>
              <article>
                <strong>IMPLEMENTATION_PLAN.md</strong>
                <p>Пошаговый план реализации.</p>
              </article>
            </div>
            <p className={styles.callout}>
              Уже стандартная практика при работе с агентами, помогает модели меньше галюцинировать и тверже придерживаться
              визуального стиля. План реализации для агента был в новинку, в целом тоже помогает.
            </p>
          </Section>

          <Section title="Что пришлось исправлять" className={styles.fixesSection}>
            <div className={styles.fixes}>
              {fixes.map((fix) => (
                <article key={fix.title}>
                  <h3>{fix.title}</h3>
                  <p>{fix.text}</p>
                </article>
              ))}
            </div>
            <blockquote className={styles.teleportQuote}>
              На самом деле фиксов было больше, но они были совсем мелкие
            </blockquote>
          </Section>

          <Section title="Инструменты и моя роль" className={styles.stackSection}>
            <p className={styles.stackList}>Figma · ImageGen · Codex · React · TypeScript · Vite · CSS Modules</p>
            <div className={styles.roleColumns}>
              <div>
                <h3>AI помогал</h3>
                <ul>
                  <li>искать визуальные варианты;</li>
                  <li>создавать черновые экраны и ассеты;</li>
                  <li>реализовывать компоненты;</li>
                  <li>находить технические проблемы;</li>
                  <li>выполнять небольшие правки.</li>
                </ul>
              </div>
              <div>
                <h3>Я отвечал за</h3>
                <ul>
                  <li>разбор задания и идею продукта;</li>
                  <li>архитектуру и пользовательский сценарий;</li>
                  <li>арт-дирекшен, ассеты и тексты;</li>
                  <li>постановку задач Codex, ревью и финальные решения.</li>
                </ul>
              </div>
            </div>
            <p className={styles.conclusion}>
              AI был инструментом ускорения. Концепция, критерии качества и финальные решения оставались за мной.
            </p>
          </Section>

          <Section title="Результат" className={styles.resultSection}>
            <div className={styles.narrowProse}>
              <p>
                Мне понравилось работать над этим заданием, потому что оно позволило совместить продуктовую
                логику, визуальный дизайн, генеративную графику и frontend-разработку. Сам кейс очень креативный
                и дает много простора для реализации.
              </p>
              <p>В результате получился работающий адаптивный прототип, а не только набор статичных экранов.</p>
              <p>
                В целом я доволен концепцией, характером бренда, сценарием конфигуратора и тем, как AI был
                встроен в процесс.
              </p>
              <p>
                Конечно, часть ассетов всё ещё находится на уровне прототипа. Их можно дополнительно
                унифицировать по свету, масштабу, детализации и контурам.
              </p>
              <p>
                В рамках ограниченного времени я приоритизировал цельную концепцию, рабочий сценарий и
                полноценную реализацию.
              </p>
              <p className={styles.finalStatement}>
                Буду рад пообщаться и ответить на ваши вопросы! tg: @oplayer1337
              </p>
            </div>
          </Section>
        </div>
      </main>
      <Footer isProcessPage />
    </div>
  )
}
