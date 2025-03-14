import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/home";
import DrawerHeader from "../components/header/drawerHeader";
import { Colors } from "../../constants/colors/colors";
import MenuDrawer from "../components/header/menuDrawer";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <MenuDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: width * 0.65,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => <DrawerHeader />,
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors.thirdBlack, // Fundo preto no header
            shadowColor: "transparent", // Remove a sombra (opcional)
            height: 180,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
