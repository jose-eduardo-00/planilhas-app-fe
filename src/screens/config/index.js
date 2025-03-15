import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal 
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import { useNavigation } from "@react-navigation/native";
import MainHeader from "../../components/header/mainHeader";
import ThemeApp from "../../../assets/icon/themeApp";
import Notification from "../../../assets/icon/notification";
import Config from "../../../assets/icon/config";

const ConfigScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("claro");
  const navigation = useNavigation();

  const themes = [
    { id: "claro", label: "Claro" },
    { id: "escuro", label: "Escuro" },
    { id: "sistema", label: "Tema do dispositivo" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

    {/* lista de config */}
    <View style={styles.settingsList}>
        <TouchableOpacity style={styles.option} onPress={() => setModalVisible(true)}>
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
    <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={styles.themeOption}
                onPress={() => {
                  setSelectedTheme(theme.id);
                  setModalVisible(false);
                }}
              >
                <View style={styles.radioCircle}>
                  {selectedTheme === theme.id && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.themeText}>{theme.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
    </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 55,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 36,
    borderRadius: 16,
    width: 300,
  },
  themeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  themeText: {
    fontSize: 16,
    marginLeft: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: Colors.black,
  },
});

export default ConfigScreen;
