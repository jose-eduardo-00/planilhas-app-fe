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
import MainSelect from "../inputs/selectInput";

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
              {/* <MainInput
                ref={typeRef}
                onChange={(t) => changeType(t)}
                placeholder={"Fixa ou variável"}
                isPassword={false}
                text={type}
                returnKeyType="next"
                onSubmitEditing={() => dateRef.current?.focus()}
                fail={typeFail}
                success={typeSuccess}
              /> */}
              <MainSelect
                value={type}
                onChange={(value) => changeType(value)}
                options={["Fixa", "Variável"]}
                fail={typeFail}
                success={typeSuccess}
              />
            </View>

            <View style={styles.boxInput2}>
              <Text style={styles.titleInput}>Vencimento</Text>
              <MainInput
                ref={dateRef}
                onChange={(t) => changeDate(t)}
                placeholder={"00/00/0000"}
                isPassword={false}
                text={date}
                returnKeyType="next"
                onSubmitEditing={() => valueRef.current?.focus()}
                fail={dateFail}
                success={dateSuccess}
                keyboardType={"number-pad"}
                maxLength={10}
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
              keyboardType={"number-pad"}
            />
          </View>

          <View style={styles.buttonBox}>
            <View style={styles.boxButton}>
              <MainButton onPress={onPress} isLoading={false} text={"FECHAR"} />
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
    width: "52%",
  },
  boxInput2: {
    width: "44%",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  boxButton: {
    alignItems: "center",
    width: "48%",
    height: 44,
  },
  buttonBox: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 44,
  },
});

export default AddRowPlanilhaModal;
