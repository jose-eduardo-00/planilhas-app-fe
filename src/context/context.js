import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext({
  token: null,
  updateToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Erro ao carregar token:", error);
      }
    };

    loadToken();
  }, []);

  const updateToken = async (newToken) => {
    try {
      if (newToken) {
        await AsyncStorage.setItem("token", newToken);
      } else {
        await AsyncStorage.removeItem("token");
      }
      setToken(newToken);
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
    }
  };

  return (
    <GlobalContext.Provider value={{ token, updateToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
