import React from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import LottieView from "lottie-react-native";
import MainButton from "../buttons/mainButton";
import { isLoading } from "expo-font";

const AlertModal = ({
  visible,
  onPress,
  success,
  message,
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
          {/* Animação de Sucesso ou Erro */}
          <LottieView
            source={
              success
                ? require("../../../assets/lottie/success.json") // Caminho para a animação de sucesso
                : require("../../../assets/lottie/error.json") // Caminho para a animação de erro
            }
            autoPlay
            loop={false}
            style={styles.lottie}
          />

          {/* Mensagem de Sucesso ou Erro */}
          <Text style={styles.message}>{message}</Text>

          {/* Botão de Fechar */}
          {/* <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity> */}

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
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 20,
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

export default AlertModal;
