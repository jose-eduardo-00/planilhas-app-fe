import React from "react";
import {
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainButton from "../buttons/mainButton";
import MainInput from "../inputs/mainInput";

const AddRowPlanilhaModal = ({
  visible,
  onPress,
  changeName,
  name,
  typeRef,
  nameFail,
  nameSuccess,
  changeType,
  type,
  typeFail,
  typeSuccess,
  dateRef,
  changeDate,
  date,
  dateFail,
  dateSuccess,
  valueRef,
  value,
  valueFail,
  valueSuccess,
  changeValue,
  isLoadingModal,
  textButton,
  handleSalvar,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onPress}
    >
      <View style={styles.modalBackground}>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.5)"}
        />
        <View style={styles.modalContainer}>
          <View style={styles.boxInput}>
            <Text style={styles.titleInput}>Nome</Text>
            <MainInput
              onChange={(t) => changeName(t)}
              placeholder={"Nome"}
              isPassword={false}
              text={name}
              returnKeyType="next"
              onSubmitEditing={() => typeRef.current?.focus()}
              fail={nameFail}
              success={nameSuccess}
            />
          </View>

          <View style={styles.boxTwoInput}>
            <View style={styles.boxInput1}>
              <Text style={styles.titleInput}>Tipo</Text>
              <MainInput
                ref={typeRef}
                onChange={(t) => changeType(t)}
                placeholder={"Fixa ou variável"}
                isPassword={false}
                text={type}
                returnKeyType="next"
                onSubmitEditing={() => dateRef.current?.focus()}
                fail={typeFail}
                success={typeSuccess}
              />
            </View>

            <View style={styles.boxInput1}>
              <Text style={styles.titleInput}>Data</Text>
              <MainInput
                ref={dateRef}
                onChange={(t) => changeDate(t)}
                placeholder={"20/01/2001"}
                isPassword={false}
                text={date}
                returnKeyType="next"
                onSubmitEditing={() => valueRef.current?.focus()}
                fail={dateFail}
                success={dateSuccess}
              />
            </View>
          </View>

          <View style={styles.boxInput}>
            <Text style={styles.titleInput}>Valor</Text>
            <MainInput
              ref={valueRef}
              onChange={(t) => changeValue(t)}
              placeholder={"R$ 2000,00"}
              isPassword={false}
              text={value}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              fail={valueFail}
              success={valueSuccess}
            />
          </View>

          <View style={styles.boxButton}>
            <MainButton
              onPress={handleSalvar}
              isLoading={isLoadingModal}
              text={textButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-around",
  },
  boxInput: {},
  titleInput: {
    paddingLeft: 8,
    marginBottom: 8,
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
  boxTwoInput: {
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxInput1: {
    width: "48%",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  boxButton: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default AddRowPlanilhaModal;
