import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";

const ButtonCard = ({ name, onPress, Icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.boxIcon}>
        <Icon />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    alignItems: "center",
  },
  boxIcon: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontFamily: "Robot-Regular",
    textAlign: "center",
  },
});

export default ButtonCard;
