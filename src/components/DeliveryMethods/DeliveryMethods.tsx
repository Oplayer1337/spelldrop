import { deliveryMethods } from '../../data/deliveryMethods'
import { useFirstViewportReveal } from '../../hooks/useFirstViewportReveal'
import styles from './DeliveryMethods.module.css'

export function DeliveryMethods() {
  const { ref, isRevealed } = useFirstViewportReveal<HTMLElement>()

  return (
    <section ref={ref} id="delivery-methods" className={styles.section} aria-labelledby="delivery-methods-title">
      <div
        className={`${styles.inner} ${styles.reveal} ${isRevealed ? styles.revealed : ''}`}
        data-reveal={isRevealed ? 'revealed' : 'pending'}
      >
        <div className={styles.intro}>
          <p className={styles.label}>Работа доставки</p>
          <h2 id="delivery-methods-title">Любая магия найдёт путь</h2>
          <p>Выберите спокойную совиную почту, ведьмин экспресс или почти мгновенный телепорт.</p>
        </div>

        <div className={styles.panel}>
          {deliveryMethods.map((method) => (
            <article className={styles.method} data-tone={method.tone} key={method.id}>
              <div className={styles.artwork}>
                <img src={method.imageSrc} alt={method.imageAlt} />
              </div>
              <div className={styles.copy}>
                <p className={styles.methodLabel}>{method.label}</p>
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <p className={styles.detail}>{method.detail}</p>
              </div>
              <dl className={styles.metadata}>
                <div>
                  <dt>Срок</dt>
                  <dd>{method.eta}</dd>
                </div>
                <div>
                  <dt>Стоимость</dt>
                  <dd>{method.price}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
