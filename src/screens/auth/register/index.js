import React, { useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../../constants/colors/colors";
import MainInput from "../../../components/inputs/mainInput";
import MainButton from "../../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const [senhaVisible, setSenhaVisible] = useState(false);
  const [confSenhaVisible, setConfSenhaVisible] = useState(false);
  const [samePass, setSamePass] = useState(false);

  const [nameFail, setNameFail] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [senhaFail, setSenhaFail] = useState(false);
  const [senhaSuccess, setSenhaSuccess] = useState(false);
  const [confSenhaFail, setConfSenhaFail] = useState(false);
  const [confSenhaSuccess, setConfSenhaSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const confSenhaRef = useRef(null);

  const handleName = (t) => {
    setName(t);
  };

  const handleEmail = (t) => {
    setEmail(t);
  };

  const handleSenha = (t) => {
    setSenha(t);

    // Verifica se a senha contém ao menos uma letra, um número e um símbolo
    const regex = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/;

    if (t != confSenha) {
      setConfSenhaSuccess(false);
      if (confSenha == "") {
        setConfSenhaFail(false);
      } else {
        setConfSenhaFail(true);
      }
    } else {
      if (confSenha == "") {
        setConfSenhaFail(false);
        setConfSenhaSuccess(false);
      } else {
        setConfSenhaFail(false);
        setConfSenhaSuccess(true);
      }
    }

    if (regex.test(t)) {
      setSenhaFail(false);
      setSenhaSuccess(true);
    } else if (t == "") {
      setSenhaFail(false);
      setSenhaSuccess(false);
    } else {
      setSenhaFail(true);
      setSenhaSuccess(false);
    }
  };

  const handleConfSenha = (t) => {
    setConfSenha(t);
    if (senha == t && t != "") {
      setConfSenhaFail(false);
      setSamePass(true);
      setConfSenhaSuccess(true);
    } else if (t == "") {
      setConfSenhaFail(false);
      setConfSenhaSuccess(false);
    } else {
      setConfSenhaFail(true);
      setSamePass(false);
      setConfSenhaSuccess(false);
    }
  };

  const handleVisibleSenha = () => {
    setSenhaVisible(!senhaVisible);
  };

  const handleVisibleConfSenha = () => {
    setConfSenhaVisible(!confSenhaVisible);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    setIsLoading(true);

    console.log("Cadastro ===>", {
      Nome: name,
      email: email,
      senha: senha,
      confirmarSenha: confSenha,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.boxInput}>
          <Text style={styles.titleInput}>Nome</Text>
          <MainInput
            onChange={handleName}
            placeholder={"Nome"}
            isPassword={false}
            text={name}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            fail={nameFail}
            success={false}
          />
        </View>

        <View style={styles.boxInput1}>
          <Text style={styles.titleInput}>Email</Text>
          <MainInput
            ref={emailRef}
            onChange={handleEmail}
            placeholder={"Email"}
            isPassword={false}
            text={email}
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current?.focus()}
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
            returnKeyType="next"
            onSubmitEditing={() => confSenhaRef.current?.focus()}
            fail={senhaFail}
            success={senhaSuccess}
          />
        </View>

        <View style={styles.boxInput1}>
          <Text style={styles.titleInput}>Confimar senha</Text>
          <MainInput
            ref={confSenhaRef}
            onChange={handleConfSenha}
            placeholder={"Confirmar Senha"}
            isPassword={true}
            isPasswordVisible={confSenhaVisible}
            text={confSenha}
            isPasswordChange={handleVisibleConfSenha}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            fail={confSenhaFail}
            success={confSenhaSuccess}
          />
        </View>

        <Text style={styles.textInfo}>
          {samePass || confSenha == "" || senha == ""
            ? "A senha deve conter os seguintes itens: letra, números e símbolos"
            : "Confirmação de senha diferente da senha"}
        </Text>

        <View style={styles.boxButton}>
          <MainButton
            text={"CADASTRAR"}
            onPress={handleRegister}
            isLoading={isLoading}
          />
        </View>

        <TouchableOpacity style={styles.boxRegister} onPress={handleLogin}>
          <Text style={styles.textRegister}>já tem conta?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
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
  textInfo: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: Colors.red,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  boxButton: {
    marginTop: 20,
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

export default RegisterScreen;
