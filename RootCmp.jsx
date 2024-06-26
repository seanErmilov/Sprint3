const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { EmailIndex } from './apps/mail/pages/EmailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/mail' element={<EmailIndex />} />
          <Route path='/note' element={<NoteIndex />} />
        </Routes>
      </section>
    </Router>
  )
}
