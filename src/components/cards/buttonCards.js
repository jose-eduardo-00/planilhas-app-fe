import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import { useGlobalContext } from "../../context/context";

const ButtonCard = ({ name, onPress, Icon, iconWidth, iconHeight, qtd }) => {
  const { theme } = useGlobalContext();

  const textColor = theme === "light" ? "#212121" : "#FFF";

  const mostrarQtd = qtd !== undefined && qtd !== null;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.boxIcon}>
        <Icon width={iconWidth} height={iconHeight} />
        {mostrarQtd && (
          <View style={styles.boxNumber}>
            <Text style={styles.number}>{qtd}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.name, { color: textColor }]}>{name}</Text>
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
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
  boxNumber: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: Colors.red,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.white,
    fontFamily: "Roboto-Bold",
  },
});

export default ButtonCard;
