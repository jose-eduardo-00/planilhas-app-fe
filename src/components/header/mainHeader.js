import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import Arrow from "../../../assets/icon/arrowBack.svg";
import { useNavigation } from "@react-navigation/native";

const MainHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ButtonArea} onPress={() => navigation.goBack()}>
        <Arrow />
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
    backgroundColor: Colors.white,
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
