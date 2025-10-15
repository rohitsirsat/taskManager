import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from "@/api";
import { LocalStorage } from "@/utils";

const AuthContext = createContext({
  user: null,
  token: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const register = async (data) => {
    try {
      const response = await registerUser(data);

      const receivedData = response.data;

      setUser(receivedData.data.user);
      setToken(receivedData.data.accessToken);

      if (!LocalStorage.get("gbColor")) {
        const randomBgColor = getRandomColor();
        LocalStorage.set("gbColor", randomBgColor);
      }

      LocalStorage.set("user", receivedData.data.user);
      LocalStorage.set("token", receivedData.data.accessToken);

      return response;
    } catch (error) {
      return error;
    }
  };

  const login = async (data) => {
    try {
      const response = await loginUser(data);

      const receivedData = response.data;

      setUser(receivedData.data.user);
      setToken(receivedData.data.accessToken);

      LocalStorage.set("user", receivedData.data.user);
      LocalStorage.set("token", receivedData.data.accessToken);

      return response;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    const response = await logoutUser();
    console.log("LOG OUT RES: ", response);
    setUser(null);
    setToken(null);
    LocalStorage.clear();
    return response;
  };

  useEffect(() => {
    const getStoredUser = LocalStorage.get("user");
    console.log("GET Stored User: ", getStoredUser?.username);
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth, AuthContext };
