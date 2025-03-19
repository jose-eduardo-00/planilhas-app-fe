import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AvatarICon from "../../../assets/icon/avatarIcon.svg";
import IconPlanilha from "../../../assets/icon/planilhaIcon.svg";
import IconDados from "../../../assets/icon/dadosIcon.svg";
import IconConfig from "../../../assets/icon/configIcon.svg";
import { Colors } from "../../../constants/colors/colors";

const MenuDrawer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.boxPerfil}>
        <View>
          <Text style={styles.name}>Marcos</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.textPerfil}>Ver perfil</Text>
          </TouchableOpacity>
        </View>
        <AvatarICon />
      </View>
      <View style={styles.div}></View>

      <TouchableOpacity
        style={styles.boxOptions}
        onPress={() => navigation.navigate("Planilhas")}
      >
        <IconPlanilha />
        <Text style={styles.textOption}>Planilhas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxOptions1}
        onPress={() => navigation.navigate("BaseData")}
      >
        <IconDados />
        <Text style={styles.textOption}>Dados Base</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxOptions1}
        onPress={() => navigation.navigate("Config")}
      >
        <IconConfig />
        <Text style={styles.textOption}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  boxPerfil: {
    paddingHorizontal: 5,
    marginTop: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
  },
  div: {
    height: 2,
    backgroundColor: Colors.gray,
    width: "110%",
    alignSelf: "center",
    marginBottom: 60,
  },
  name: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: Colors.thirdBlack,
    marginBottom: 10,
  },
  textPerfil: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: Colors.thirdBlack,
    textAlign: "center",
  },
  boxOptions: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  boxOptions1: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginTop: 25,
  },
  textOption: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
});

export default MenuDrawer;
