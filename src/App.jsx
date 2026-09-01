import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Visitor from './pages/Visitor'
import Sidebar from './components/Sidebar'
import User from './pages/User'
import Book from './pages/Book'
import Board from './pages/Board'
import Setting from './pages/Setting'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.app}>
    <Header />

    <div className={styles.content}>
      <Sidebar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/user" element={<User />} />
          <Route path="/book" element={<Book />} />
          <Route path="/board" element={<Board />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </main>
    </div>
  </div>
)

export default App
