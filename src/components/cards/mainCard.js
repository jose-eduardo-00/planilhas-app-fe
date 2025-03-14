import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";

const MainCard = ({ name, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxName}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.boxDate}>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 20,
  },
  boxName: {
    backgroundColor: Colors.thirdBlack,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  boxDate: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  date: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
});

export default MainCard;
