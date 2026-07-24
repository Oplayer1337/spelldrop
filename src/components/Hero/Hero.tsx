import { heroContent } from '../../data/hero'
import styles from './Hero.module.css'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

export function Hero() {
  const handleCtaClick = () => {
    const configurator = document.getElementById('configurator')

    if (!configurator) {
      return
    }

    configurator.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    configurator.focus({ preventScroll: true })
  }

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title} aria-label="Доставка заклинаний">
            <span>{heroContent.title.firstLine}</span>
            <span className={styles.highlightedLine}>
              {heroContent.title.highlightedLine}
              <span className={styles.titleSparkle} aria-hidden="true" />
            </span>
          </h1>
          <p className={styles.description}>{heroContent.description}</p>
          <button className={styles.cta} type="button" onClick={handleCtaClick}>
            <span className={styles.ctaSparkle} aria-hidden="true" />
            {heroContent.ctaLabel}
          </button>
        </div>

        <div
          className={styles.illustration}
          role="img"
          aria-label="Ведьма-курьер летит на метле с сумкой зелий на фоне фиолетовой луны"
        >
          <img className={styles.moon} src="/assets/hero/hero-assets-moon-bg.png" alt="" />
          <img className={styles.bag} src="/assets/hero/hero-assets-bag.png" alt="" />
          <img
            className={styles.witch}
            src="/assets/mascot/hero-witch.png"
            alt=""
          />
          <img
            className={styles.floatingBottle}
            src="/assets/hero/hero-assets-bottle-extra-3.png"
            alt=""
          />
        </div>

      </div>
    </section>
  )
}
