import React, { useRef, useState } from "react";
import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainInput from "../../components/inputs/mainInput";
import MainButton from "../../components/buttons/mainButton";

const BaseDataScreen = () => {
  const [salario, setSalario] = useState("");
  const [outros, setOutros] = useState("");

  const [salarioFail, setSalarioFail] = useState(false);
  const [outrosFail, setOutrosFail] = useState(false);

  const [salarioSuccess, setSalarioSuccess] = useState(false);
  const [outrosSuccess, setOutrosSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const salarioRef = useRef(null);
  const outrosRef = useRef(null);

  const handleSalario = (t) => {
    setSalario(t);
  };

  const handleOutros = (t) => {
    setOutros(t);
  };

  const handleSalvar = () => {};

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Dados Base</Text>
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.titleInput}>Salário</Text>
        <MainInput
          onChange={handleSalario}
          placeholder={"R$ 00,00"}
          isPassword={false}
          text={salario}
          returnKeyType="next"
          onSubmitEditing={() => outrosRef.current?.focus()}
          fail={salarioFail}
          success={salarioSuccess}
        />
      </View>

      <View style={styles.boxInput1}>
        <Text style={styles.titleInput}>Outras Fontes</Text>
        <MainInput
          ref={outrosRef}
          onChange={handleOutros}
          placeholder={"R$ 00,00"}
          isPassword={false}
          text={outros}
          returnKeyType="next"
          onSubmitEditing={Keyboard.dismiss}
          fail={outrosFail}
          success={outrosSuccess}
        />
      </View>

      <View style={styles.boxButton}>
        <MainButton
          text={"SALVAR"}
          onPress={handleSalvar}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
    paddingHorizontal: 25,
  },
  boxTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
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
  boxButton: {
    marginTop: 60,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default BaseDataScreen;
