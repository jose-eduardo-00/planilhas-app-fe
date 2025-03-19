import React, { useRef, useState } from "react";
import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainInput from "../../components/inputs/mainInput";
import MainButton from "../../components/buttons/mainButton";
import AlertModal from "../../components/modals/alertModal";

const AddPlanilhaScreen = () => {
  const [name, setName] = useState("");

  const [nameFail, setNameFail] = useState(false);

  const [nameSuccess, setNameSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingModalAlert, setIsLoadingModalAlert] = useState(false);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalAlertSuccess, setModalAlertSuccess] = useState(false);
  const [modalAlertMessage, setModalAlertMessage] = useState("");

  const handleName = (t) => {
    setName(t);
  };

  const handleSalvar = () => {
    setModalAlertSuccess(true);
    setModalAlertMessage("Planilha salva com sucesso!");
    setModalAlertVisible(true);
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

export default AddPlanilhaScreen;
