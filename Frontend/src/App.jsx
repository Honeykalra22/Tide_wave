// import './App.css'
// import Navbar from './pages/Navbar'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Footer from './components/Footer'
// import LoginSetup from './pages/LoginSetup'
// import LoginPage from './pages/LoginPage'
// import Register from './pages/Register'
// import Profile from './pages/Profile'
// import Dashboard from './pages/DashBoard'
// import Sidebar from './pages/Sidebar'

// function App() {

//   return (
//     <div className='h-auto bg-slate-950 text-white overflow-auto'>
//       <BrowserRouter>
//         <div className=''>
//           <Navbar />
//           <Sidebar/>
//         </div>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/search' />
//           <Route path='/notification' />
//           <Route path='/explore' />
//           <Route path='/career' />
//           {/* <Route path='login' element = {<LoginSetup/>}/> */}
//           <Route path='/login' element={<LoginPage />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/feedback' />
//           <Route path='/profile' element={<Profile/>}/>
//           <Route path='/dashboard' element = {<Dashboard/>}/>
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App

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

function App() {

  const {darkMode} = useContext(ThemeContext)

  return (
    <div className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen overflow-auto`}>
      <BrowserRouter>
      
        <div className="fixed top-0 left-0 right-0 z-10">
          <Navbar />
        </div>

        <div className="fixed top-28 left-0 z-10 w-64 bg-gray-800">
          <Sidebar />
        </div>

        {/* Main Content - Adjusted to avoid overlap with Navbar and Sidebar */}
        <div className="ml-64 mt-28 pl-4 pr-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<div>Search Page (Add component here)</div>} />
            <Route path="/notification" element={<div>Notification Page (Add component here)</div>} />
            <Route path="/explore" element={<div>Explore Page (Add component here)</div>} />
            <Route path="/career" element={<div>Career Page (Add component here)</div>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<div>Feedback Page (Add component here)</div>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard/:username" element={<Dashboard/>} />
          </Routes>
        </div>

        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
