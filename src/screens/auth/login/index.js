import React, { useRef, useState } from "react";
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
import AlertModal from "../../../components/modals/alertModal";
import api from "../../../../service/api/auth/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [senhaVisible, setSenhaVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [emailFail, setEmailFail] = useState(false);
  const [senhaFail, setSenhaFail] = useState(false);

  const navigation = useNavigation();
  const senhaRef = useRef(null);

  const handleEmail = (t) => {
    setEmailFail(false);
    setEmail(t);
  };

  const handleSenha = (t) => {
    setSenhaFail(false);
    setSenha(t);
  };

  const handleVisibleSenha = () => {
    setSenhaVisible(!senhaVisible);
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleForgotPass = () => {
    navigation.navigate("SendEmail");
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (email === "" || senha === "") {
      setIsLoading(false);
      setModalMessage("Preencha todos os campos!");
      setModalSuccess(false);
      setVisible(true);
      setEmailFail(email === "");
      setSenhaFail(senha === "");
      return;
    }

    try {
      const response = await api.loginUser(email, senha);
      console.log(response, response.data);

      if (response.status === 200) {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

        setModalMessage("Login realizado com sucesso!");
        setModalSuccess(true);
        setVisible(true);
      } else if (response.status === 401) {
        setModalMessage("Email ou senha inválidos!");
        setModalSuccess(false);
        setEmailFail(true);
        setSenhaFail(true);
        setVisible(true);
      } else {
        setModalMessage("Erro de conexão, tente novamente mais tarde!");
        setModalSuccess(false);
        setVisible(true);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      setModalMessage("Erro ao conectar. Tente novamente.");
      setModalSuccess(false);
      setVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlertModal = () => {
    if (modalSuccess) {
      setVisible(!visible);
      navigation.navigate("Drawer");
    } else {
      setVisible(!visible);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.boxInput}>
        <Text style={styles.titleInput}>Email</Text>
        <MainInput
          onChange={handleEmail}
          placeholder={"Email"}
          isPassword={false}
          text={email}
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
          cap={"none"}
          fail={emailFail}
          success={false}
        />
      </View>

      <View style={styles.boxInput1}>
        <Text style={styles.titleInput}>Senha</Text>
        <MainInput
          ref={senhaRef}
          onChange={handleSenha}
          placeholder={"Senha"}
          isPassword={true}
          isPasswordVisible={senhaVisible}
          text={senha}
          isPasswordChange={handleVisibleSenha}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          fail={senhaFail}
          success={false}
        />
      </View>

      <TouchableOpacity style={styles.boxforgotPass} onPress={handleForgotPass}>
        <Text style={styles.textforgotPass}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.boxButton}>
        <MainButton
          text={"LOGIN"}
          onPress={handleLogin}
          isLoading={isLoading}
        />
      </View>

      <TouchableOpacity style={styles.boxRegister} onPress={handleRegister}>
        <Text style={styles.textRegister}>Ainda não tem conta?</Text>
      </TouchableOpacity>

      <AlertModal
        visible={visible}
        message={modalMessage}
        success={modalSuccess}
        onPress={handleAlertModal}
        isLoadingModal={isLoadingModal}
        textButton={"Entrar"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 100,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
  },
  boxInput: {
    marginTop: 60,
  },
  titleInput: {
    paddingLeft: 8,
    marginBottom: 8,
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
  boxInput1: {
    marginTop: 20,
  },
  boxforgotPass: {
    marginTop: 20,
  },
  textforgotPass: {
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "Roboto-Bold",
    color: Colors.red,
  },
  boxButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
  boxRegister: {
    marginTop: 30,
  },
  textRegister: {
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
});

export default LoginScreen;
