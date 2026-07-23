import { Configurator } from './components/Configurator/Configurator'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'

function App() {
  return (
    <div className="page-shell">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Configurator />
      </main>
    </div>
  )
}

export default App
