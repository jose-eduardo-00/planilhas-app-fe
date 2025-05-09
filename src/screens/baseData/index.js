import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainInput from "../../components/inputs/mainInput";
import MainButton from "../../components/buttons/mainButton";
import api from "../../../service/api/user/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertModal from "../../components/modals/alertModal";
import { useFocusEffect } from "@react-navigation/native";

const BaseDataScreen = () => {
  const [user, setUser] = useState(null);
  const [salario, setSalario] = useState("");
  const [outros, setOutros] = useState("");

  const [salarioFail, setSalarioFail] = useState(false);
  const [outrosFail, setOutrosFail] = useState(false);

  const [salarioSuccess, setSalarioSuccess] = useState(false);
  const [outrosSuccess, setOutrosSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const salarioRef = useRef(null);
  const outrosRef = useRef(null);

  const formatCurrency = (value) => {
    let num = value.replace(/\D/g, ""); // Remove tudo que não for número
    num = (Number(num) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return num;
  };

  const formatCurrencyValue = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleToken = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);

      setUser(parsedUser);
      handleSalario(formatCurrencyValue(parsedUser.salario));
      handleOutros(formatCurrencyValue(parsedUser.outras_fontes));
    } else {
      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleToken();
    }, [])
  );

  const handleSalario = (t) => {
    if (!t) {
      setSalario(""); // Se estiver vazio, não faz nada
      return;
    }

    setSalario(formatCurrency(t));
  };

  const handleOutros = (t) => {
    if (!t) {
      setOutros(""); // Se estiver vazio, não faz nada
      return;
    }

    setOutros(formatCurrency(t));
  };

  const handleSalvar = () => {
    setIsLoading(true);

    const formatNumberForDatabase = (value) => {
      return value
        .replace("R$", "")
        .trim()
        .replace(/\./g, "")
        .replace(",", ".");
    };

    const salarioFormatado = formatNumberForDatabase(salario);
    const outrosFormatado = formatNumberForDatabase(outros);

    api
      .updateBaseDate(user.id, salarioFormatado, outrosFormatado)
      .then(async (res) => {
        if (res.status === 200) {
          setIsLoading(false);

          await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
          setModalMessage("Dados salvos com sucesso!");
          setModalSuccess(true);
          setVisible(true);

          handleToken();
        } else {
          setIsLoading(false);
          setModalMessage("Erro de conexão, tente novamente mais tarde!");
          setModalSuccess(false);
          setVisible(true);
        }
      });
  };

  const handleAlertModal = () => {
    setVisible(!visible);
  };

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
          keyboardType={"number-pad"}
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
          keyboardType={"number-pad"}
        />
      </View>

      <View style={styles.boxButton}>
        <MainButton
          text={"SALVAR"}
          onPress={handleSalvar}
          isLoading={isLoading}
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
