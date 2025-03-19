import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import { useNavigation } from "@react-navigation/native";
import ThemeApp from "../../../assets/icon/themeApp";
import Notification from "../../../assets/icon/notification";
import Config from "../../../assets/icon/config";
import ThemeModal from "../../components/modals/themeModal";

const ConfigScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("claro");
  const navigation = useNavigation();

  const themes = [
    { id: "claro", label: "Claro" },
    { id: "escuro", label: "Escuro" },
    { id: "sistema", label: "Tema do dispositivo" },
  ];

  const handleThemeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <Text style={styles.title}>Configurações</Text>

      {/* lista de config */}
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.option} onPress={handleThemeModal}>
          <ThemeApp />
          <Text style={styles.optionText}>Tema do App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Notification />
          <Text style={styles.optionText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Config />
          <Text style={styles.optionText}>Configuração 3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Config />
          <Text style={styles.optionText}>Configuração 4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Config />
          <Text style={styles.optionText}>Configuração 5</Text>
        </TouchableOpacity>
      </View>

      {/* modal seleção de tema */}
      <ThemeModal onPress={handleThemeModal} visible={modalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
    marginBottom: 10,
  },
  settingsList: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    marginLeft: 10,
  },
});

export default ConfigScreen;
