import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginSetup from './pages/LoginSetup'
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import Profile from './pages/Profile'

function App() {

  return (
    <div className='h-auto bg-slate-950 text-white overflow-auto'>
      <BrowserRouter>
        <div className=''>
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' />
          <Route path='/notification' />
          <Route path='/explore' />
          <Route path='/career' />
          {/* <Route path='login' element = {<LoginSetup/>}/> */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feedback' />
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
