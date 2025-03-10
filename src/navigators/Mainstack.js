import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splashscreen";
import LoginScreen from "../screens/auth/login";
import MainHeader from "../components/header/mainHeader";

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
        // options={{ header: () => <MainHeader /> }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
