import { Configurator } from './components/Configurator/Configurator'
import { DeliveryMethods } from './components/DeliveryMethods/DeliveryMethods'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage'
import { ProcessPage } from './components/ProcessPage/ProcessPage'
import { useDocumentMetadata } from './hooks/useDocumentMetadata'
import { useRouteHashScroll } from './hooks/useRouteHashScroll'

function App() {
  useRouteHashScroll()

  const currentPath = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/'

  const metadata =
    currentPath === '/process'
      ? {
          title: 'AI Worklog — как создавался SPELLDROP',
          description:
            'Разбор процесса создания SPELLDROP: концепция, ImageGen, подготовка ассетов, работа с Codex и итерации разработки.',
          pathname: '/process',
        }
      : currentPath === '/'
        ? {
            title: 'SPELLDROP — доставка магических зелий',
            description:
              'Интерактивный сервис доставки зелий: выберите ситуацию, настройте эффекты, флакон и способ доставки.',
            pathname: '/',
          }
        : {
            title: '404 — заклинание не найдено | SPELLDROP',
            description: 'Страница SPELLDROP не найдена.',
            pathname: currentPath,
          }

  useDocumentMetadata(metadata)

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
