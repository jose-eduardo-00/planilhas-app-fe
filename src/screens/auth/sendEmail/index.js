import React, { useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../constants/colors/colors";
import MainInput from "../../../components/inputs/mainInput";
import MainButton from "../../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";
import api from "../../../../service/api/user/index";
import AlertModal from "../../../components/modals/alertModal";

const SendEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const inputRef = useRef(null);

  const navigation = useNavigation();

  const handleEmail = (t) => {
    setEmail(t);
  };

  const handleSend = () => {
    setIsLoading(true);

    api.sendEmailResetPass(email).then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
        navigation.navigate("VerifyCode", {
          email: email,
          rota: "sendEmail",
          id: res.data.user.id,
        });
      } else if (res.status === 400) {
        setIsLoading(false);
        setModalMessage("Email não informado, preencha o campo!");
        setModalSuccess(false);
        setVisible(true);
      } else if (res.status === 404) {
        setIsLoading(false);
        setModalMessage("Email não cadastrado, preencha o campo corretamente!");
        setModalSuccess(false);
        setVisible(true);
      } else {
        setIsLoading(false);
        setModalMessage("Falha na conexão, tente novamente mais tarde!");
        setModalSuccess(false);
        setVisible(true);
      }
    });
  };

  const handleAlertModal = () => {
    if (modalSuccess) {
      setVisible(!visible);
      // navigation.navigate("VerifyCode", {
      //   email: email,
      //   id: userId,
      //   rota: "register",
      // });
    } else {
      setVisible(!visible);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Email</Text>

      <Text style={styles.subTitle}>Insira seu email cadastrado no app</Text>

      <View style={styles.boxInput}>
        <MainInput
          ref={inputRef}
          onChange={handleEmail}
          placeholder={"email@example.com"}
          isPassword={false}
          text={email}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          cap={"none"}
        />
      </View>

      <View style={styles.boxButton}>
        <MainButton
          isLoading={isLoading}
          onPress={handleSend}
          text={"ENVIAR"}
        />
      </View>

      <AlertModal
        visible={visible}
        message={modalMessage}
        success={modalSuccess}
        onPress={handleAlertModal}
        isLoadingModal={isLoadingModal}
        textButton={"CONTINUAR"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 55,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  subTitle: {
    marginTop: 45,
    fontSize: 18,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  boxInput: {
    marginTop: 30,
  },
  boxButton: {
    marginTop: 100,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default SendEmailScreen;
