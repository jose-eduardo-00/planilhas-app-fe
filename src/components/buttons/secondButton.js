import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";

const SecondButton = ({ text, onPress, isLoading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={20} color={Colors.white} />
      ) : (
        <Text style={styles.textButton}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.white,
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

export default SecondButton;
