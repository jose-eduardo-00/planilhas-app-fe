import React from "react";
import { useNavigation } from "@react-navigation/native";
import IconMenu from "../../../assets/icon/menuIcon.svg";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";

const DrawerHeader = () => {
  const navigation = useNavigation();

  const getSaudacao = () => {
    const agora = new Date();
    const horas = agora.getHours();

    if (horas >= 6 && horas < 12) {
      return "Olá, Bom dia";
    } else if (horas >= 12 && horas < 19) {
      return "Olá, Boa tarde";
    } else {
      return "Olá, Boa noite";
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor={Colors.thirdBlack}
      />
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IconMenu />
      </TouchableOpacity>
      <Text style={styles.text}>{getSaudacao()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: Colors.white,
  },
});

export default DrawerHeader;
