import { createContext, useContext, useState, useEffect } from "react";
import Loader from "../Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloading , setisloading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setisloading(false);


    const Myfunction = ()=>{
        console.log("my function executed")
    }


    return Myfunction()


  }, []);

  // Login function (called after successful backend response)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove session
  };


  if(isloading){

    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
