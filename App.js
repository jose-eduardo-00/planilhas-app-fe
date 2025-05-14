import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import MainStack from "./src/navigators/Mainstack";
import { ContextProvider } from "./src/context/context";

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={"#fff"}
        />
        <MainStack />
      </NavigationContainer>
    </ContextProvider>
  );
}
