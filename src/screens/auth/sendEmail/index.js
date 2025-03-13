import React, { useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../constants/colors/colors";
import MainInput from "../../../components/inputs/mainInput";
import MainButton from "../../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";

const SendEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  const navigation = useNavigation();

  const handleEmail = (t) => {
    setEmail(t);
  };

  const handleSend = (t) => {
    navigation.navigate("VerifyCode", { email: email, rota: "sendEmail" });
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
        />
      </View>

      <View style={styles.boxButton}>
        <MainButton
          isLoading={isLoading}
          onPress={handleSend}
          text={"ENVIAR"}
        />
      </View>
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
