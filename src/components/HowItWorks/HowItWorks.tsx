import { configuratorAssets } from '../../data/assets'
import { useFirstViewportReveal } from '../../hooks/useFirstViewportReveal'
import styles from './HowItWorks.module.css'

const principles = [
  {
    number: '01',
    title: 'Вы выбираете зелье',
    description: 'Расскажите, чего не хватает, и подберите нужный эффект.',
    visual: 'choice',
  },
  {
    number: '02',
    title: 'Ведьмочки творят магию',
    description: 'Каждое заклинание собирается вручную из проверенных ингредиентов.',
    visual: 'craft',
  },
  {
    number: '03',
    title: 'Материалы — за золотые, магия — за хорошую карму',
    description: 'Золотые покрывают ингредиенты, а сама магия оплачивается вашей хорошей кармой.',
    visual: 'materials',
  },
] as const

function StoryVisual({ visual }: { visual: (typeof principles)[number]['visual'] }) {
  if (visual === 'choice') {
    return (
      <div className={`${styles.visual} ${styles.choiceVisual}`} aria-hidden="true">
        <img className={styles.choiceBottleSmall} src={configuratorAssets.bottles.small} alt="" />
        <img className={styles.choiceBottlePrimary} src={configuratorAssets.effects.fast} alt="" />
        <img className={styles.choiceBottleAccent} src={configuratorAssets.effects.safe} alt="" />
      </div>
    )
  }

  if (visual === 'craft') {
    return (
      <div className={`${styles.visual} ${styles.craftVisual}`} aria-hidden="true">
        <img className={styles.craftWitch} src={configuratorAssets.mascot.default} alt="" />
        <img className={styles.craftBottle} src={configuratorAssets.bottles.medium} alt="" />
      </div>
    )
  }

  return (
    <div className={`${styles.visual} ${styles.materialsVisual}`} aria-hidden="true">
      <img className={styles.materialsBottle} src={configuratorAssets.effects.aroma} alt="" />
      <img className={styles.materialsCoin} src={configuratorAssets.delivery.coin} alt="" />
      <span className={styles.materialsSparkle} />
    </div>
  )
}

export function HowItWorks() {
  const { ref, isRevealed } = useFirstViewportReveal<HTMLElement>()

  return (
    <section ref={ref} id="how-it-works" className={styles.section} aria-labelledby="how-it-works-title">
      <div
        className={`${styles.inner} ${styles.reveal} ${isRevealed ? styles.revealed : ''}`}
        data-reveal={isRevealed ? 'revealed' : 'pending'}
      >
        <div className={styles.intro}>
          <p className={styles.label}>Как это работает</p>
          <h2 id="how-it-works-title">Вы выбираете зелье — остальное делают ведьмочки</h2>
          <p>Мы собираем заклинание вручную, а материалы оплачиваются золотыми, магией и хорошей кармой.</p>
        </div>

        <div className={styles.panel}>
          {principles.map((principle) => (
            <article className={styles.principle} key={principle.number}>
              <StoryVisual visual={principle.visual} />
              <div className={styles.copy}>
                <span className={styles.number}>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
