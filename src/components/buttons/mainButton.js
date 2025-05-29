import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import { useGlobalContext } from "../../context/context";

const MainButton = ({ text, onPress, isLoading }) => {
  const { theme } = useGlobalContext();

  const backgroundColor = theme === "light" ? "#000" : "#FFFFFF";
  const textColor = theme === "light" ? "#FFF" : "#212121";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size={20} color={textColor} />
      ) : (
        <Text style={[styles.textButton, { color: textColor }]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 15,
    fontFamily: "Roboto-Bold",
    letterSpacing: 1,
  },
});

export default MainButton;
