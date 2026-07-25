import { Configurator } from './components/Configurator/Configurator'
import { DeliveryMethods } from './components/DeliveryMethods/DeliveryMethods'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage'
import { ProcessPage } from './components/ProcessPage/ProcessPage'
import { useRouteHashScroll } from './hooks/useRouteHashScroll'

function App() {
  useRouteHashScroll()

  const currentPath = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/'

  if (currentPath === '/process') {
    return <ProcessPage />
  }

  if (currentPath !== '/') {
    return <NotFoundPage />
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
