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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const senhaRef = useRef(null);

  const handleEmail = (t) => {
    setEmail(t);
  };

  const handleSenha = (t) => {
    setSenha(t);
  };

  const handleVisibleSenha = () => {
    setSenhaVisible(!senhaVisible);
  };

  const handleRegister = () => {
    // redirecionar pro cadastro quando tiver
    // navigation.navigate("Cadastro");
  };

  const handleForgotPass = () => {
    // redirecionar pro esqueceu a senha quando tiver
    // navigation.navigate("RecoveryPass");
  };

  const handleLogin = () => {
    setIsLoading(true);

    console.log("Email ===>", email);
    console.log("Senha ===>", senha);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.boxInput}>
        <MainInput
          onChange={handleEmail}
          placeholder={"Email"}
          isPassword={false}
          text={email}
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
        />
      </View>

      <View style={styles.boxInput1}>
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
        />
      </View>

      <TouchableOpacity style={styles.boxforgotPass} onPress={handleForgotPass}>
        <Text style={styles.textforgotPass}>esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.boxButton}>
        <MainButton
          text={"LOGIN"}
          onPress={handleLogin}
          isLoading={isLoading}
        />
      </View>

      <TouchableOpacity style={styles.boxRegister} onPress={handleRegister}>
        <Text style={styles.textRegister}>ainda não tem conta?</Text>
      </TouchableOpacity>
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
