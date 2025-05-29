import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

const GlobalContext = createContext({
  token: null,
  updateToken: () => {},
  theme: "light",
  toggleTheme: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [theme, setTheme] = useState("light");

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

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          const systemTheme = Appearance.getColorScheme() || "light";
          setTheme(systemTheme);
        }
      } catch (error) {
        console.error("Erro ao carregar tema:", error);
      }
    };

    loadTheme();
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

  const toggleTheme = async (val) => {
    const newTheme = val === "light" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <GlobalContext.Provider value={{ token, updateToken, theme, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
