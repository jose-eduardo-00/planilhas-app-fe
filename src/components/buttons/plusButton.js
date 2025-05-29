import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import PlusIcon from "../../../assets/icon/plusBlackIcon.svg";
import { useGlobalContext } from "../../context/context";

const PlusButton = ({ onPress, isLoading }) => {
  const { theme } = useGlobalContext();

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const textColor = theme === "light" ? "#212121" : "#FFF";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size={20} color={textColor} />
      ) : (
        <PlusIcon width={"90%"} height={"90%"} style={{ color: textColor }} />
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
    color: Colors.black,
    letterSpacing: 1,
  },
});

export default PlusButton;
