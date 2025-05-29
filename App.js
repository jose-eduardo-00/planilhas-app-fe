import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import MainStack from "./src/navigators/Mainstack";
import { ContextProvider, useGlobalContext } from "./src/context/context";
import * as SystemUI from "expo-system-ui";
import React, { useEffect } from "react";

// Esse componente é usado dentro do ContextProvider para acessar o tema
const AppContent = () => {
  const { theme } = useGlobalContext();

  useEffect(() => {
    const color = theme === "light" ? "#FFFFFF" : "#212121";
    SystemUI.setBackgroundColorAsync(color);
  }, [theme]);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        translucent={true}
        backgroundColor={theme === "light" ? "#FFFFFF" : "#212121"}
      />
      <MainStack />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}
