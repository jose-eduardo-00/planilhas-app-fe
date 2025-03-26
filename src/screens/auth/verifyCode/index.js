import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../../constants/colors/colors";
import MainInput from "../../../components/inputs/mainInput";
import MainButton from "../../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";
import InputCode from "../../../components/inputs/inputCode";
import api from "../../../../service/api/auth/index";
import AlertModal from "../../../components/modals/alertModal";

const VerifyCodeScreen = ({ route }) => {
  const [code, setCode] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(30);

  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { email, rota, id } = route.params;

  const inputRef = useRef(null);

  const navigation = useNavigation();

  const handleCode = (t) => {
    setCode(t);
  };

  const handleAlertModal = () => {
    if (modalSuccess) {
      setVisible(!visible);
      if (rota == "sendEmail") {
        navigation.navigate("RecoveryPass", { id: id });
      } else if (rota == "register") {
        navigation.reset({
          routes: [{ name: "Drawer" }],
        });
      }
    } else {
      setVisible(!visible);
    }
  };

  const handleRecovery = () => {
    setIsLoading(true);
    // if (rota == "sendEmail") {
    //   //terminar quando for fazer a recuperação de senha
    //   navigation.navigate("RecoveryPass");
    //   setIsLoading(false);
    // } else if (rota == "register") {
    if (code == "") {
      setIsLoading(false);
      setModalMessage("Preencha o campo de código!");
      setModalSuccess(false);
      setVisible(true);
    } else {
      api.verifyCode(code, id).then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setModalMessage("Código verificado com sucesso!");
          setModalSuccess(true);
          setVisible(true);
        } else if (res.status === 400) {
          setIsLoading(false);
          setModalMessage(
            "Código inválido ou expirado, preencha corretamente o campo!"
          );
          setModalSuccess(false);
          setVisible(true);
        } else if (res.status === 401) {
          setIsLoading(false);
          setModalMessage(
            "Erro ao verificar o código, tente novamente mais tarde!"
          );
          setModalSuccess(false);
          setVisible(true);
        } else {
          setIsLoading(false);
          setModalMessage(
            "Erro ao verificar o código, tente novamente mais tarde!"
          );
          setModalSuccess(false);
          setVisible(true);
        }
      });
      // }
    }
  };

  const maskString = (str) => {
    if (str.length <= 4) return str; // Se a string tiver 4 caracteres ou menos, retorna como está
    return str.slice(0, 4) + "**********";
  };

  const handleReenviar = () => {
    // qunado o envio de email estiver funcionando fazer issa logica de reenvio de email
    setTime(30);
  };

  useEffect(() => {
    setEmailCode(maskString(email));
  }, []);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Limpa o timer ao desmontar o componente
  }, [time]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Insira o código que enviamos {"\n"} para o email
      </Text>

      <Text style={styles.subTitle}>{emailCode}</Text>

      <View style={styles.boxInput}>
        <InputCode
          ref={inputRef}
          onChange={handleCode}
          placeholder={"000000"}
          text={code}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          maxLength={6}
        />
      </View>

      <TouchableOpacity style={styles.buttonRee} onPress={handleReenviar}>
        <Text
          style={[
            styles.textButtonRee,
            time != 0 ? styles.textButtonReeOff : null,
          ]}
        >
          Reenviar {time == 0 ? "" : `${time}s`}
        </Text>
      </TouchableOpacity>

      <View style={styles.boxButton}>
        <MainButton
          isLoading={isLoading}
          onPress={handleRecovery}
          text={"VERIFICAR"}
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
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  subTitle: {
    marginTop: 25,
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  boxInput: {
    marginTop: 60,
  },
  buttonRee: {
    marginTop: 40,
    alignSelf: "center",
  },
  textButtonRee: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
  textButtonReeOff: {
    color: Colors.gray,
  },
  boxButton: {
    marginTop: 60,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default VerifyCodeScreen;
