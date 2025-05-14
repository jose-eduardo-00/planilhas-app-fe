import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainInput from "../../components/inputs/mainInput";
import MainButton from "../../components/buttons/mainButton";
import AlertModal from "../../components/modals/alertModal";
import api from "../../../service/api/planilha/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../context/context";
import { jwtDecode } from "jwt-decode";

const AddPlanilhaScreen = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  const [nameFail, setNameFail] = useState(false);

  const [nameSuccess, setNameSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingModalAlert, setIsLoadingModalAlert] = useState(false);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalAlertSuccess, setModalAlertSuccess] = useState(false);
  const [modalAlertMessage, setModalAlertMessage] = useState("");

  const { token } = useGlobalContext();

  const handleCheckToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    if (token) {
      handleCheckToken();
    }
  }, [token]);

  const navigation = useNavigation();

  const handleName = (t) => {
    setName(t);
  };

  const handleSalvar = () => {
    setIsLoading(true);
    if (name == "") {
      setIsLoading(false);
      setModalAlertSuccess(false);
      setModalAlertMessage("Preencha o campo de nome!");
      setModalAlertVisible(true);
    } else {
      api.createPlanilha(user.id, name).then((res) => {
        if (res.status === 201) {
          setIsLoading(false);
          setModalAlertSuccess(true);
          setModalAlertMessage("Planilha criada com sucesso!");
          setModalAlertVisible(true);
          setName("");

          setTimeout(() => {
            setModalAlertVisible(false);
            navigation.navigate("PlanilhaPreview", { id: res.data.id });
          }, 2000);
        } else {
          setIsLoading(false);
          setModalAlertSuccess(false);
          setModalAlertMessage("Ocorreu um erro, tente novamente mais tarde!");
          setModalAlertVisible(true);
        }
      });
    }
  };

  const handleCloseModalAlert = () => {
    setModalAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Criar Planilha</Text>
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.titleInput}>Nome</Text>
        <MainInput
          onChange={handleName}
          placeholder={"Nome da planilha"}
          isPassword={false}
          text={name}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          fail={nameFail}
          success={nameSuccess}
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
        visible={modalAlertVisible}
        message={modalAlertMessage}
        success={modalAlertSuccess}
        onPress={handleCloseModalAlert}
        isLoadingModal={isLoadingModalAlert}
        textButton={modalAlertSuccess ? "CONTINUAR" : "FECHAR"}
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

export default AddPlanilhaScreen;
