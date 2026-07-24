import { Configurator } from './components/Configurator/Configurator'
import { DeliveryMethods } from './components/DeliveryMethods/DeliveryMethods'
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
        <DeliveryMethods />
        <Configurator />
      </main>
      <Footer />
    </div>
  )
}

export default App
