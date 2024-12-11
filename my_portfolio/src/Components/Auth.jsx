import { createContext, useMemo, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //---This get user data from local storage---//
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData || null);

  const storedToken = Cookies.get("token");

  const [token, setToken] = useState(storedToken || null);

  //----This insert the user data with use effect---//
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (token) {
      Cookies.set("token", token, { expires: 1 }); //set expires as one day
    }
  }, [user, token]);

  const loginUser = (user, token) => {
    console.log(token);
    setToken(token);
    Cookies.set("token", storedToken, { expires: 1 });
    setToken(token);
    setUser(user);
  };

  const memoizedUser = useMemo(() => ({ user, token }), [user, token]);

  const logOut = () => {
    setUser(null);
  };

  const authContextValue = useMemo(
    () => ({
      user,
      storedToken,
      loginUser,
      logOut,
    }),
    [user, token]
  );

  // console.log({ user });

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
