import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import Arrow from "../../../assets/icon/arrowBack.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGlobalContext } from "../../context/context";

const MainHeader = () => {
  const navigation = useNavigation();

  const { theme } = useGlobalContext();

  const route = useRoute();

  const rota = route.params?.rota;

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const iconColor = theme === "light" ? "#212121" : "#FFF";

  const back = () => {
    if (rota) {
      navigation.reset({
        routes: [{ name: rota }],
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity style={styles.ButtonArea} onPress={() => back()}>
        <Arrow style={{ color: iconColor }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  ButtonArea: {
    position: "absolute",
    bottom: "8%",
    left: "8%",
    zIndex: 2,
  },
});

export default MainHeader;
