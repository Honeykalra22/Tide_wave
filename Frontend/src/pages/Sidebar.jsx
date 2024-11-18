import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Sidebar() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { userdetails, user } = useContext(AuthContext);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (isLoggedIn) {
      userdetails();
    }
    // else {
    //   setUser(null);
    // }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <aside
        className={`${
          darkMode ? "bg-gray-800 shadow-xl" : "bg-gray-900 border-r"
        } w-full p-4 border-r`}
      >
        <nav className="space-y-5 flex flex-col">
          {isLoggedIn && user && (
            <Link to={`/profile/${user.username}`}>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  // src={user.avatar}
                  src={
                    user.avatar ||
                    "https://cdn.pixabay.com/photo/2024/10/18/03/16/ai-generated-9129245_1280.jpg"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-400"
                />
                <span
                  className={`text-lg font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {user.username}
                </span>
              </div>
            </Link>
          )}
          <Link
            to="/dashboard"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p>Home</p>
            </div>
          </Link>
          <Link
            to={`/search`}
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <p>Search</p>
            </div>
          </Link>
          <Link
            to="/message"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>

              <p>Messages</p>
            </div>
          </Link>
          <Link
            to={`/dashboard/${user?.username}`}
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>

              <p>Tweet</p>
            </div>
          </Link>
          <Link
            to={`/addpost`}
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>

              <p>Post</p>
            </div>
          </Link>
          <Link
            to={`/profile/${user?.username}`}
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p>Profile</p>
            </div>
          </Link>
          <Link
            to="/setting"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <div className="flex space-x-5 items-center border py-2 justify-center rounded-lg font-semibold hover:bg-gray-900 focus:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <p>Settings</p>
            </div>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`block text-lg ${
                darkMode
                  ? "text-red-500 hover:text-white"
                  : "text-red-600 hover:text-red-700"
              }`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`block text-lg ${
                darkMode
                  ? "text-green-400 hover:text-white"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
