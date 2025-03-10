import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import MainStack from "./src/navigators/Mainstack";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={"#fff"}
      />
      <MainStack />
    </NavigationContainer>
  );
}
