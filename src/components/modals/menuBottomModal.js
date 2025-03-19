import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import SearchIcon from "../../../assets/icon/searchIcon.svg";

const MenuBottomModal = ({
  visible,
  onPress,
  textYear,
  textName,
  onChangeName,
  onChangeYear,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.boxYear}>
              <Text style={styles.textYear}>ANO:</Text>
              <TextInput
                style={[styles.textYear, styles.textYear1]}
                placeholder="2001"
                maxLength={4}
                keyboardType="number-pad"
                value={textYear}
                onChangeText={(t) => onChangeYear(t)}
              />
            </View>
            <View style={styles.boxSearch}>
              <View style={styles.icon}>
                <SearchIcon />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={textName}
                onChangeText={(t) => onChangeName(t)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: 68,
    backgroundColor: Colors.thirdBlack,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  boxYear: {
    backgroundColor: Colors.white,
    height: 40,
    width: "30%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  boxSearch: {
    backgroundColor: Colors.white,
    height: 40,
    width: "65%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textYear: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: "Roboto-Black",
    height: 40,
    textAlignVertical: "center",
  },
  textYear1: {
    marginBottom: -6,
    marginLeft: -6,
  },
  icon: {
    width: "15%",
    height: 40,
  },
  input: {
    width: "85%",
    height: 40,
    color: Colors.black,
    fontSize: 16,
    fontFamily: "Roboto-Black",
    marginBottom: -6,
  },
});

export default MenuBottomModal;
