import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splashscreen";
import LoginScreen from "../screens/auth/login";
import MainHeader from "../components/header/mainHeader";
import RegisterScreen from "../screens/auth/register";
import RecoveryPassScreen from "../screens/auth/recoveyPass";
import SendEmailScreen from "../screens/auth/sendEmail";
import VerifyCodeScreen from "../screens/auth/verifyCode";
import DrawerNavigator from "./DrawerNavigator";
import ConfigScreen from "../screens/config";
import ProfileScreen from "../screens/profile";

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

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SendEmail"
        component={SendEmailScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="VerifyCode"
        component={VerifyCodeScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="RecoveryPass"
        component={RecoveryPassScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
