import './App.css'
import Navbar from './pages/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/DashBoard'
import Sidebar from './pages/Sidebar'
import { useContext } from 'react'
import { ThemeContext } from './Context/ThemeContext'
import ImageUploader from './components/AddPost'
import MessgageSend from './pages/MessageSend'

function App() {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen flex flex-col`}
    >
      <BrowserRouter>
        <div className="fixed top-0 left-0 right-0 z-10 w-full">
          <Navbar />
        </div>

        {/* Sidebar fixed on the left */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }  h-full mt-28 w-[16rem] fixed`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="ml-64 mt-28 flex-1 px-4 py-4">
          <Routes>
            <Route path="/profile/:username" element={<Home />} />
            <Route path="/search" element={<div>Search Page (Add component here)</div>} />
            <Route path="/notification" element={<div>Notification Page (Add component here)</div>} />
            <Route path="/explore" element={<div>Explore Page (Add component here)</div>} />
            <Route path="/career" element={<div>Career Page (Add component here)</div>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<div>Feedback Page (Add component here)</div>} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/dashboard/:username" element={<Dashboard />} />
            <Route path='/addpost' element = {<ImageUploader/>} />
            <Route path='/message' element = {<MessgageSend/>} />
          </Routes>
        </div>

        {/* Footer, positioned at the bottom */}
        <div className="ml-64 mt-auto">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
