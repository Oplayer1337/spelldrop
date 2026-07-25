import { Configurator } from './components/Configurator/Configurator'
import { DeliveryMethods } from './components/DeliveryMethods/DeliveryMethods'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { ProcessPage } from './components/ProcessPage/ProcessPage'

function App() {
  const currentPath = typeof window === 'undefined' ? '/' : window.location.pathname

  if (currentPath.replace(/\/+$/, '') === '/process') {
    return <ProcessPage />
  }

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
