import React from "react";
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

const NotificationScreen = () => {
  const navigation = useNavigation();

  const notifications = [
    "Backup concluído! Seus dados estão seguros",
    "Você recebeu acesso a uma nova planilha!",
    "Alguém editou sua planilha: clique para ver as alterações.",
    "Sua planilha foi salva com sucesso!",
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <Text style={styles.title}>Notificações</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification, index) => (
          <View key={index} style={styles.settingsList}>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionText}>{notification}</Text>
              <ArrowIcon style={styles.arrow} />
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
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.gray,
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
