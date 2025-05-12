import React from "react";
import {
  Image,
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainButton from "../buttons/mainButton";
import AvatarICon from "../../../assets/icon/avatarIcon.svg";
import MainInput from "../inputs/mainInput";
import SecondButton from "../buttons/secondButton";
import { baseUrl } from "../../../service/config";

const EditProfileModal = ({
  visible,
  onPress,
  isLoading,
  changeName,
  name,
  avatar,
  emailRef,
  changeEmail,
  email,
  handleSalvar,
  handleImg,
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
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarIcon} />
            ) : (
              <AvatarICon width={80} height={80} style={styles.avatarIcon} />
            )}
            <View style={styles.boxButtonEdit}>
              <MainButton
                text="EDITAR FOTO"
                onPress={handleImg}
                isLoading={isLoading}
              />
            </View>
          </View>

          <View style={styles.boxInput}>
            <Text style={styles.titleInput}>Nome</Text>
            <MainInput
              onChange={(t) => changeName(t)}
              placeholder="example"
              text={name}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
          </View>

          <View style={styles.boxInput}>
            <Text style={styles.titleInput}>Email</Text>
            <MainInput
              ref={emailRef}
              onChange={(t) => changeEmail(t)}
              placeholder="email@example.com"
              text={email}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          {/* <View style={styles.boxInput}>
            <Text style={styles.titleInput}>Renda Mensal</Text>
            <MainInput
              ref={incomeRef}
              onChange={(t) => changeIncome(t)}
              placeholder="R$ 00,00"
              text={income}
              onSubmitEditing={Keyboard.dismiss}
              isPassword={true}
              isPasswordVisible={incomeVisible}
              isPasswordChange={handleIncomeChange}
              keyboardType={"number-pad"}
            />
          </View> */}

          <View style={styles.boxButton}>
            <MainButton
              text="EDITAR"
              onPress={handleSalvar}
              isLoading={isLoading}
            />
          </View>
          <View style={styles.boxButton1}>
            <SecondButton text="FECHAR" onPress={onPress} isLoading={false} />
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 70,
    alignItems: "center",
  },
  lottie: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: Colors.black,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.thirdBlack,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  boxButton: {
    marginTop: 30,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
  boxButton1: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    height: 52,
  },

  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  boxInput: {
    marginTop: 20,
  },
  titleInput: {
    paddingLeft: 8,
    marginBottom: 8,
    fontSize: 15,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
  boxButtonEdit: {
    marginTop: 20,
    alignItems: "center",
    width: 140,
    height: 40,
  },

  avatarIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
  },
});

export default EditProfileModal;
