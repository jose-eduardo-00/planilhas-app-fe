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
import { useGlobalContext } from "../../context/context";

const ThemeModal = ({ visible, onPress, onCancel }) => {
  const { theme, toggleTheme } = useGlobalContext();

  const [selectedTheme, setSelectedTheme] = useState(theme);

  const themes = [
    { id: "light", label: "Claro" },
    { id: "dark", label: "Escuro" },
    // { id: "sistema", label: "Tema do dispositivo" },
  ];

  const handleChangeTheme = (id) => {
    setSelectedTheme(id);
    toggleTheme(id);
    onCancel();
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const textColor = theme === "light" ? "#212121" : "#FFF";
  const radioColor = theme === "light" ? "#212121" : "#FFF";

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalBackground}>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.5)"}
        />
        <View
          style={[styles.modalContainer, { backgroundColor: backgroundColor }]}
        >
          {themes.map((theme) => (
            <TouchableOpacity
              key={theme.id}
              style={styles.themeOption}
              onPress={() => handleChangeTheme(theme.id)}
            >
              <View style={[styles.radioCircle, { borderColor: radioColor }]}>
                {selectedTheme === theme.id && (
                  <View
                    style={[
                      styles.radioInnerCircle,
                      { backgroundColor: radioColor },
                    ]}
                  />
                )}
              </View>
              <Text style={[styles.themeText, { color: textColor }]}>
                {theme.label}
              </Text>
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
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: {
    height: 14,
    width: 14,
    borderRadius: 7,
  },
});

export default ThemeModal;
