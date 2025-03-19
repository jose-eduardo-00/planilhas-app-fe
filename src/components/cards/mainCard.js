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
    borderRadius: 30,
    shadowColor: Colors.secondaryBlack,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    padding: 5,
  },
  boxName: {
    backgroundColor: Colors.thirdBlack,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
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
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  date: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
});

export default MainCard;
