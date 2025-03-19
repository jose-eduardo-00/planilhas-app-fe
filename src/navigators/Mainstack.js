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
import NotificationScreen from "../screens/notification";
import PlanilhasScreen from "../screens/planilhas";
import BaseDataScreen from "../screens/baseData";
import PlanilhaPreviewScreen from "../screens/planilhaPreview";
import PlanilhaEditScreen from "../screens/editPlanilha";
import AddPlanilhaScreen from "../screens/addPlanilha";

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
        name="Notification"
        component={NotificationScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="Planilhas"
        component={PlanilhasScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="BaseData"
        component={BaseDataScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="PlanilhaPreview"
        component={PlanilhaPreviewScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="PlanilhaEdit"
        component={PlanilhaEditScreen}
        options={{ header: () => <MainHeader /> }}
      />

      <Stack.Screen
        name="AddPlanilha"
        component={AddPlanilhaScreen}
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
