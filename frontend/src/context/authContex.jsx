// import { createContext, useState, useContext, useEffect } from "react";
// import { loginUser, logoutUser, registerUser, getCurrentUser } from "@/api";
// import { LocalStorage } from "@/utils";
// import { Loader } from "@/components/Loader";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext({
//   user: null,
//   token: null,
//   register: async () => {},
//   login: async () => {},
//   logout: async () => {},
// });

// const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const navigate = useNavigate();

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const register = async (data) => {
//     try {
//       const response = await registerUser(data);

//       const receivedData = response.data;

//       setUser(receivedData.data.user);
//       setToken(receivedData.data.accessToken);

//       if (!LocalStorage.get("gbColor")) {
//         const randomBgColor = getRandomColor();
//         LocalStorage.set("gbColor", randomBgColor);
//       }

//       LocalStorage.set("user", receivedData.data.user);
//       LocalStorage.set("token", receivedData.data.accessToken);
//       navigate("/projects");

//       return response;
//     } catch (error) {
//       return error;
//     }
//   };

//   const login = async (data) => {
//     try {
//       const response = await loginUser(data);

//       const receivedData = response.data;

//       setUser(receivedData.data.user);
//       setToken(receivedData.data.accessToken);

//       LocalStorage.set("user", receivedData.data.user);
//       LocalStorage.set("token", receivedData.data.accessToken);
//       navigate("/projects");

//       return response;
//     } catch (error) {
//       return error;
//     }
//   };

//   const logout = async () => {
//     const response = await logoutUser();
//     setUser(null);
//     setToken(null);
//     LocalStorage.remove("user");
//     LocalStorage.remove("token");
//     return response;
//   };

//   // const getServerUser = async () => {
//   //   setIsLoading(true);
//   //   const serverUser = await getCurrentUser();
//   //   if (serverUser) {
//   //     console.log("GET CURRENT USER: ", serverUser);
//   //     const serverAccessToken = serverUser.data.accessToken;
//   //     const serverRefreshToken = serverUser.data.refreshToken;

//   //     setUser(serverUser.data.user);
//   //     setToken(serverAccessToken);

//   //     LocalStorage.set("user", serverUser.data.user);
//   //     LocalStorage.set("token", serverUser.data.accessToken);

//   //     setIsLoading(false);

//   //     return serverUser;
//   //   } else {
//   //     navigate("/login");
//   //   }
//   // };

//   useEffect(() => {
//     setIsLoading(true);
//     const getStoredUser = LocalStorage.get("user");
//     const getStoredToken = LocalStorage.get("token");

//     if (getStoredToken && getStoredUser?._id) {
//       setUser(getStoredUser);
//       setToken(getStoredToken);
//     }
//     setIsLoading(false);
//     // getServerUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, register, token, login, logout }}>
//       {isLoading ? <Loader message="Loading ProjectFlow..." /> : children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, useAuth, AuthContext };

import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "@/api";
import { LocalStorage } from "@/utils";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

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
      setIsAuthenticated(true);

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
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    try {
      const response = await logoutUser();
      return response;
    } catch (err) {
      console.log("Logout error: ", err);
    } finally {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      LocalStorage.remove("user");
      LocalStorage.remove("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    let mounted = true;

    const authApiCheck = async () => {
      setIsLoading(true);
      try {
        const response = await getCurrentUser();
        console.log("GET CURR USER:", response);

        if (response?.data?.data?.user) {
          const userData = response.data.data.user;
          if (mounted) {
            setUser(userData);
            setIsAuthenticated(true);
            LocalStorage.set("user", userData);

            if (response.data.accessToken) {
              setToken(response.data.data.accessToken);
              LocalStorage.set("token", response.data.data.accessToken);
            }
          }
        } else {
          throw new Error("IN AUTH CONTEXT: No user data");
        }
      } catch (error) {
        console.log("Auth authApiCheck error", error);
        if (mounted) {
          setUser(null), setToken(null), setIsAuthenticated(false);
          LocalStorage.remove("user");
          LocalStorage.remove("token");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    authApiCheck();
    return () => {
      mounted = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth, AuthContext };
