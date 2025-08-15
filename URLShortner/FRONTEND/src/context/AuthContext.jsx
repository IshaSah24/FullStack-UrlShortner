import { createContext, useContext, useEffect, useState } from "react";
import { ValidateUser } from "../apis/user.api.js";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while checking auth

  const fetchUser = async () => {
    try{
        const isValid =  await ValidateUser();
        if (isValid) {
          setUser(isValid);
        } else {
          setUser(null);
        }
    }catch(err){
        // console.error("Error fetching user:", err);
        setUser(null);
    }finally {
      setLoading(false); //  always clear loading
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const logout = async () => {
  //   await axios.post("/api/logout", {}, { withCredentials: true });
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
