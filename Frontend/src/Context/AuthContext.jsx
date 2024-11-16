import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const url = "http://localhost:8000/api/v2";

  const [user, setUser] = useState(null);

  const userdetails = async () => {
    try {
      const response = await axios.get(`${url}/user/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const userdata = response.data.data;
      setUser({
        username: userdata.username,
        avatar: userdata.avatar,
      });
      console.log('user data is: ', userdata)
      console.log('avatar is: ', userdata.avatar)
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ userdetails, user }}>
      {children}
    </AuthContext.Provider>
  );
};
