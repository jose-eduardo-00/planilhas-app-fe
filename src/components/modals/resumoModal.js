import React from "react";
import { Modal, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainButton from "../buttons/mainButton";

const ResumoModal = ({
  visible,
  onPress,
  renda,
  total,
  saldo,
  isLoadingModal,
  textButton,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onPress}
    >
      <View style={styles.modalBackground}>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.5)"}
        />
        <View style={styles.modalContainer}>
          <View style={styles.boxMessage}>
            <Text style={styles.message}>RENDA:</Text>
            <Text style={styles.messageValue}>{renda}</Text>
          </View>

          <View style={styles.boxMessage1}>
            <Text style={styles.message}>TOTAL DAS CONTAS:</Text>
            <Text style={styles.messageValue}>{total}</Text>
          </View>

          <View style={styles.boxMessage1}>
            <Text style={styles.message}>SALDO:</Text>
            <Text style={styles.messageValue}>{saldo}</Text>
          </View>

          <View style={styles.boxButton}>
            <MainButton
              onPress={onPress}
              isLoading={isLoadingModal}
              text={textButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-around",
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  boxMessage: {
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 15,
  },
  boxMessage1: {
    flexDirection: "column",
    marginBottom: 15,
  },
  message: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: "Roboto-Black",
    textAlign: "center",
  },
  messageValue: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.thirdBlack,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  boxButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default ResumoModal;
