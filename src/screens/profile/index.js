import React, { useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainInput from "../../components/inputs/mainInput";
import MainButton from "../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";
import AvatarICon from "../../../assets/icon/avatarIcon.svg";
import EditProfileModal from "../../components/modals/editProfileModal";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [income, setIncome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [visibleModalEdit, setVisibleModalEdit] = useState(false);

  const emailRef = useRef(null);
  const incomeRef = useRef(null);

  // modal de edição
  const [nameEdit, setNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [incomeEdit, setIncomeEdit] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingModalEdit, setIsLoadingModalEdit] = useState(false);
  const [incomeVisibleEdit, setIncomeVisibleEdit] = useState(false);

  const emailEditRef = useRef(null);
  const incomeEditRef = useRef(null);

  const navigation = useNavigation();

  const handleEditName = (t) => {
    setNameEdit(t);
  };

  const handleName = (t) => {
    setName(t);
  };

  const handleEditEmail = (t) => {
    setEmailEdit(t);
  };

  const handleEmail = (t) => {
    setEmail(t);
  };

  const handleEditIncome = (t) => {
    setIncomeEdit(t);
  };

  const handleIncome = (t) => {
    setIncome(t);
  };

  const handleEdit = () => {
    setVisibleModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setVisibleModalEdit(false);
  };

  const handlePassChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEditIncomeChange = () => {
    setIncomeVisibleEdit(!incomeVisibleEdit);
  };

  const handleEditSalvar = () => {};

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={Colors.white}
        />
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.avatarContainer}>
          <AvatarICon width={80} height={80} style={styles.avatarIcon} />
        </View>

        <View style={styles.boxInput}>
          <Text style={styles.titleInput}>Nome</Text>
          <MainInput
            onChange={(t) => handleName(t)}
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
            onChange={(t) => handleEmail(t)}
            placeholder="email@example.com"
            text={email}
            returnKeyType="next"
            onSubmitEditing={() => incomeRef.current?.focus()}
          />
        </View>

        <View style={styles.boxInput}>
          <Text style={styles.titleInput}>Renda Mensal</Text>
          <MainInput
            ref={incomeRef}
            onChange={(t) => handleIncome(t)}
            placeholder="R$ 00,00"
            text={income}
            onSubmitEditing={Keyboard.dismiss}
            isPassword={true}
            isPasswordVisible={passwordVisible}
            isPasswordChange={handlePassChange}
            keyboardType={"number-pad"}
          />
        </View>

        <View style={styles.boxButton}>
          <MainButton
            text="EDITAR"
            onPress={handleEdit}
            isLoading={isLoading}
          />
        </View>

        <EditProfileModal
          visible={visibleModalEdit}
          onPress={handleCloseModalEdit}
          isLoading={isLoadingModal}
          changeName={handleEditName}
          name={nameEdit}
          email={emailEdit}
          emailRef={emailEditRef}
          changeEmail={handleEditEmail}
          income={incomeEdit}
          incomeRef={incomeEditRef}
          changeIncome={handleEditIncome}
          handleIncomeChange={handleEditIncomeChange}
          incomeVisible={incomeVisibleEdit}
          handleSalvar={handleEditSalvar}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto-Regular",
    marginBottom: 10,
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
  boxButton: {
    marginTop: 50,
    alignItems: "center",
    width: "100%",
    height: 52,
  },
});

export default ProfileScreen;
