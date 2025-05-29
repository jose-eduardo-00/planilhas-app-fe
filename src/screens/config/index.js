import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import ThemeApp from "../../../assets/icon/themeApp";
import Notification from "../../../assets/icon/notification.svg";
import Config from "../../../assets/icon/config";
import ThemeModal from "../../components/modals/themeModal";
import { useGlobalContext } from "../../context/context";

const ConfigScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { theme } = useGlobalContext();

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const textColor = theme === "light" ? "#212121" : "#FFF";
  const iconColor = theme === "light" ? "#212121" : "#FFF";

  const handleThemeModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCloseModalTheme = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        translucent={true}
        backgroundColor={backgroundColor}
      />
      <Text style={[styles.title, { color: textColor }]}>Configurações</Text>

      {/* lista de config */}
      <View style={styles.settingsList}>
        <TouchableOpacity style={styles.option} onPress={handleThemeModal}>
          <ThemeApp
            width={23}
            height={23}
            style={[styles.icon2, { color: iconColor }]}
          />
          <Text style={[styles.optionText, { color: textColor }]}>
            Tema do App
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Notification
            width={30}
            height={30}
            style={[styles.icon, { color: iconColor }]}
          />
          <Text style={[styles.optionText, { color: textColor }]}>
            Notificações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Config
            width={25}
            height={25}
            style={[styles.icon1, { color: iconColor }]}
          />
          <Text style={[styles.optionText, { color: textColor }]}>
            Configuração 3
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Config
            width={25}
            height={25}
            style={[styles.icon1, { color: iconColor }]}
          />
          <Text style={[styles.optionText, { color: textColor }]}>
            Configuração 4
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Config
            width={25}
            height={25}
            style={[styles.icon1, { color: iconColor }]}
          />
          <Text style={[styles.optionText, { color: textColor }]}>
            Configuração 5
          </Text>
        </TouchableOpacity>
      </View>

      {/* modal seleção de tema */}
      <ThemeModal
        onPress={handleThemeModal}
        visible={modalVisible}
        onCancel={handleCloseModalTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  icon: {
    marginLeft: -2,
    marginRight: -3,
  },
  icon1: {
    marginLeft: -1,
    marginRight: 0,
  },
  icon2: {
    marginLeft: 3,
    marginRight: -2,
  },
});

export default ConfigScreen;
