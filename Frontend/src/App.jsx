import './App.css'
import Navbar from './pages/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Sidebar from './pages/Sidebar'
import { useContext } from 'react'
import { ThemeContext } from './Context/ThemeContext'
import ImageUploader from './components/AddPost'
import MessgageSend from './pages/MessageSend'
import EditDetails from './pages/EditDetails'
import Search from './pages/Search'
import TweetBox from './pages/Tweet'
import Profile from './pages/Profile'
import { AuthContext } from './Context/AuthContext'
import LogoutPage from './pages/LogoutPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { darkMode } = useContext(ThemeContext)
  const { token } = useContext(AuthContext)

  return (
    <div
      className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        } min-h-screen flex flex-col`}
    >
      <BrowserRouter>
        <div className="fixed top-0 left-0 right-0 z-10 w-full">
          <Navbar />
        </div>

        {/* Sidebar fixed on the left */}
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-gray-100"
            }  h-full mt-28 w-[16rem] fixed`}
        >
          <Sidebar />
        </div>

        <div className="ml-64 mt-28 flex-1 px-4 py-4">

          <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />

              <Route path='/:username' element={<Home />} />
              <Route path=".:username/profile" element={<Profile />} />
              <Route path="/:username/search" element={<Search />} />
              <Route path="/:username/notification" element={<div>Notification Page (Add component here)</div>} />
              <Route path="/:username/explore" element={<div>Explore Page (Add component here)</div>} />
              <Route path="/:username/career" element={<div>Career Page (Add component here)</div>} />
              <Route path="/:username/feedback" element={<div>Feedback Page (Add component here)</div>} />
              <Route path="/:username/tweet" element={<TweetBox />} />
              <Route path='/:username/addpost' element={<ImageUploader />} />
              <Route path='/:username/message' element={<MessgageSend />} />
              <Route path='/:username/editProfile' element={<EditDetails />} />

            <Route path='*' element={<div>404 page is not found</div>} />
          </Routes>
        </div>
        <div className="ml-64 mt-auto">
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
