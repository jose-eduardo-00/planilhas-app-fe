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
          <Text style={styles.message}>RENDA: R$ {renda}</Text>
          <Text style={styles.message}>
            TOTAL DAS CONTAS {"\n"} R$ {total}
          </Text>
          <Text style={styles.message}>SALDO: R$ {saldo}</Text>

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
  message: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: "Roboto-Black",
    textAlign: "center",
    marginBottom: 30,
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
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default ResumoModal;
