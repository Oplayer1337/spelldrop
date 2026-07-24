import { Configurator } from './components/Configurator/Configurator'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'

function App() {
  return (
    <div className="page-shell">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <HowItWorks />
        <section id="delivery-methods" aria-label="Работа доставки">
          <Configurator />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
