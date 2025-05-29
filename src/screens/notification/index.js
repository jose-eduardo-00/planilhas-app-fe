import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "../../../assets/icon/arrowRight.svg";
import { useGlobalContext } from "../../context/context";
import api from "../../../service/api/notification/index";
import { jwtDecode } from "jwt-decode";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(null);
  const [user, setUser] = useState(null);

  const { theme, token } = useGlobalContext();

  const navigation = useNavigation();

  // const notifications = [
  //   "Backup concluído! Seus dados estão seguros",
  //   "Você recebeu acesso a uma nova planilha!",
  //   "Alguém editou sua planilha: clique para ver as alterações.",
  //   "Sua planilha foi salva com sucesso!",
  // ];

  const handleToken = async () => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } else {
      navigation.navigate("Login");
    }
  };

  const getAllNotification = () => {
    api.getAllNotifications().then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setNotifications(res.data);
      }
    });
  };

  useEffect(() => {
    handleToken();
    getAllNotification();
  }, []);

  const handleViewNotification = (item) => {
    api.viewNotification(user.id, item.id).then((res) => {
      console.log(res.status, res.data);
      // if (res.status === 201) {
      // }
    });
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const backgroundColorOption =
    theme === "light" ? Colors.gray : Colors.thirdGray;
  const textColor = theme === "light" ? "#212121" : "#FFF";
  const iconColor = theme === "light" ? "#212121" : "#FFF";

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        translucent={true}
        backgroundColor={backgroundColor}
      />
      <Text style={[styles.title, { color: textColor }]}>Notificações</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications &&
          notifications.map((notification, index) => (
            <View key={index} style={styles.settingsList}>
              <TouchableOpacity
                style={[
                  styles.option,
                  { backgroundColor: backgroundColorOption },
                ]}
                onPress={() => handleViewNotification(notification)}
              >
                <Text style={[styles.optionText, { color: textColor }]}>
                  {notification.nome}
                </Text>
                <ArrowIcon style={[styles.arrow, { color: iconColor }]} />
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  scrollContainer: {
    paddingBottom: 30,
    marginTop: 40,
  },
  settingsList: {
    marginTop: 23,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    width: "90%",
  },
  arrow: {
    marginLeft: 10,
  },
});

export default NotificationScreen;
