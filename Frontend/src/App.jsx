import './App.css';
import Navbar from './pages/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Sidebar from './pages/Sidebar';
import { useContext } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import ImageUploader from './components/AddPost';
import MessageSend from './pages/MessageSend';
import EditDetails from './pages/EditDetails';
import Search from './pages/Search';
import TweetBox from './pages/Tweet';
import Profile from './pages/Profile';
import { AuthContext } from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    // <div
    //   className={`${
    //     darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
    //   } min-h-screen flex flex-col`}
    // >
    //   <BrowserRouter>
    //     <div className="fixed top-0 left-0 right-0 z-10 w-full">
    //       <Navbar />
    //     </div>

    //     {/* Sidebar fixed on the left */}
    //     <div
    //       className={`${
    //         darkMode ? "bg-gray-800" : "bg-gray-100"
    //       } md:h-full mt-20 w-full md:w-[16rem] fixed bottom-0`}
    //     >
    //       <Sidebar />
    //     </div>

    //     {/* Main content area */}
    //     <div className="md:ml-64 mt-20 flex-1 px-4 py-4">
    //       <Routes>
    //         {/* Public Routes */}
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/register" element={<Register />} />

    //         {/* Protected Routes */}
    //         <Route
    //           path="/:username"
    //           element={
    //             isLoggedIn && user ? (
    //               <Home />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />
    //         <Route
    //           path="/:username/profile"
    //           element={
    //             isLoggedIn && user ? (
    //               <Profile />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />
    //         <Route
    //           path="/:username/search"
    //           element={
    //             isLoggedIn && user ? (
    //               <Search />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />
    //         <Route
    //           path="/:username/tweet"
    //           element={
    //             isLoggedIn && user ? (
    //               <TweetBox />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />
    //         <Route
    //           path="/:username/addpost"
    //           element={
    //             isLoggedIn && user ? (
    //               <ImageUploader />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />
    //         <Route
    //           path="/:username/message"
    //           element={
    //             isLoggedIn && user ? (
    //               <MessageSend />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />
    //         <Route
    //           path="/:username/editProfile"
    //           element={
    //             isLoggedIn && user ? (
    //               <EditDetails />
    //             ) : (
    //               <Navigate to="/login" replace />
    //             )
    //           }
    //         />

    //         {/* Default Route */}
    //         <Route path="/" element={<Navigate to="/login" replace />} />

    //         {/* 404 Page */}
    //         <Route path="*" element={<div>404 Page Not Found</div>} />
    //       </Routes>
    //     </div>

    //     {/* Footer */}
    //     <div className="md:ml-64 mt-auto">
    //       <Footer />
    //     </div>
    //   </BrowserRouter>
    // </div>


    <div
  className={`${
    darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
  } min-h-screen flex flex-col`}
>
  <BrowserRouter>
    {/* Navbar fixed at the top */}
    <div className="fixed top-0 left-0 right-0 z-10 w-full">
      <Navbar />
    </div>

    {/* Sidebar fixed on the left */}
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      } md:h-full mt-20 md:w-[16rem] w-full fixed bottom-0`}
    >
      <Sidebar />
    </div>

    {/* Main content area */}
    <div className="md:ml-[19vw] mt-20 flex-1 px-4 py-4">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/:username"
          element={
            isLoggedIn && user ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:username/profile"
          element={
            isLoggedIn && user ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:username/search"
          element={
            isLoggedIn && user ? (
              <Search />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:username/tweet"
          element={
            isLoggedIn && user ? (
              <TweetBox />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:username/addpost"
          element={
            isLoggedIn && user ? (
              <ImageUploader />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:username/message"
          element={
            isLoggedIn && user ? (
              <MessageSend />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:username/editProfile"
          element={
            isLoggedIn && user ? (
              <EditDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Page */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>

    {/* Footer */}
    <div className="md:ml-64 mt-auto">
      <Footer />
    </div>
  </BrowserRouter>
</div>

  );
}

export default App;
