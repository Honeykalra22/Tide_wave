import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  
    const {user} = useContext(AuthContext)
  
    return <div>home is mine baby!!!!</div>;
};

export default Home;
