import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../constants/colors/colors";
import MainInput from "../../../components/inputs/mainInput";
import MainButton from "../../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";
import InputCode from "../../../components/inputs/inputCode";

const VerifyCodeScreen = ({ route }) => {
  const [code, setCode] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { email, rota } = route.params;

  const inputRef = useRef(null);

  const navigation = useNavigation();

  const handleCode = (t) => {
    setCode(t);
  };

  const handleRecovery = () => {
    if (rota == "sendEmail") {
      navigation.navigate("RecoveryPass");
    } else if (rota == "register") {
      navigation.navigate("Drawer");
    }
  };

  const maskString = (str) => {
    if (str.length <= 4) return str; // Se a string tiver 4 caracteres ou menos, retorna como está
    return str.slice(0, 4) + "**********";
  };

  useEffect(() => {
    setEmailCode(maskString(email));
  }, []);

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

      <View style={styles.boxButton}>
        <MainButton
          isLoading={isLoading}
          onPress={handleRecovery}
          text={"VERIFICAR"}
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
  boxButton: {
    marginTop: 100,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default VerifyCodeScreen;
