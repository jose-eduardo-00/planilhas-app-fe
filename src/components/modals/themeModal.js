import React, { useState } from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import LottieView from "lottie-react-native";
import MainButton from "../buttons/mainButton";
import { isLoading } from "expo-font";

const ThemeModal = ({ visible, onPress }) => {
  const [selectedTheme, setSelectedTheme] = useState("claro");

  const themes = [
    { id: "claro", label: "Claro" },
    { id: "escuro", label: "Escuro" },
    { id: "sistema", label: "Tema do dispositivo" },
  ];

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.5)"}
        />
        <View style={styles.modalContainer}>
          {themes.map((theme) => (
            <TouchableOpacity
              key={theme.id}
              style={styles.themeOption}
              onPress={() => {
                setSelectedTheme(theme.id);
                onPress();
              }}
            >
              <View style={styles.radioCircle}>
                {selectedTheme === theme.id && (
                  <View style={styles.radioInnerCircle} />
                )}
              </View>
              <Text style={styles.themeText}>{theme.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ThemeModal;
