import React, { useEffect, useRef, useState } from "react";
import {
  Image,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../../service/config";
import * as ImagePicker from "expo-image-picker";
import AlertModal from "../../components/modals/alertModal";
import api from "../../../service/api/user/index";
import { useGlobalContext } from "../../context/context";
import { jwtDecode } from "jwt-decode";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
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
  const [avatarEdit, setAvatarEdit] = useState("");
  const [avatarEditObj, setAvatarEditObj] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingModalEdit, setIsLoadingModalEdit] = useState(false);
  const [incomeVisibleEdit, setIncomeVisibleEdit] = useState(false);

  //alert
  const [visible, setVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const emailEditRef = useRef(null);
  const incomeEditRef = useRef(null);

  const navigation = useNavigation();

  const { updateToken } = useGlobalContext();

  const { token } = useGlobalContext();

  const handleCheckToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);

      setUser(decoded.user);
      setName(decoded.user.name);
      setNameEdit(decoded.user.name);
      setEmail(decoded.user.email);
      setEmailEdit(decoded.user.email);
      setAvatar(decoded.user.avatar);
      setAvatarEdit(
        decoded.user.avatar
          ? `${baseUrl}/public/${decoded.user.avatar}`
          : decoded.user.avatar
      );
    } else {
      handleLogin();
    }
  };

  useEffect(() => {
    if (token) {
      handleCheckToken();
    }
  }, [token]);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // useEffect(() => {
  //   const loadUserData = async () => {
  //     try {
  //       const user = await AsyncStorage.getItem("user");
  //       if (user) {
  //         const parsedUser = JSON.parse(user);
  //         setUser(parsedUser);
  //         setName(parsedUser.name);
  //         setNameEdit(parsedUser.name);
  //         setEmail(parsedUser.email);
  //         setEmailEdit(parsedUser.email);
  //         setAvatar(parsedUser.avatar);
  //         setAvatarEdit(
  //           parsedUser.avatar
  //             ? `${baseUrl}/public/${parsedUser.avatar}`
  //             : parsedUser.avatar
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Erro ao carregar dados do usuário:", error);
  //     }
  //   };

  //   loadUserData();
  // }, []);

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

  const handleImg = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("É necessário permitir o acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0];

      setAvatarEditObj(selectedImageUri);
      setAvatarEdit(selectedImageUri.uri);
    }
  };

  const handleAlertModal = () => {
    if (modalSuccess) {
      setVisibleModalEdit(false);
    }

    setVisible(!visible);
  };

  const handleEditSalvar = () => {
    if (nameEdit == "") {
      setModalSuccess(false);
      setModalMessage("O campo de nome não pode ficar vazio.");
      setVisible(true);
    } else if (emailEdit == "") {
      setModalSuccess(false);
      setModalMessage("O campo de email não pode ficar vazio.");
      setVisible(true);
    } else {
      api
        .updateUser(user.id, nameEdit, emailEdit, avatarEditObj)
        .then(async (res) => {
          console.log(res.status, res.data);
          if (res.status === 200) {
            updateToken(res.data.token);

            setAvatarEditObj("");

            setModalMessage("Perfil atualizado com sucesso.");
            setModalSuccess(true);
            setVisible(true);
            handleCheckToken();
          } else {
            setModalSuccess(false);
            setModalMessage(
              "Falha ao tentar editar o perfil, tente novamente mais tarde."
            );
            setVisible(true);
          }
        });
    }
  };

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
          {avatar ? (
            <Image
              source={{ uri: `${baseUrl}/public/${avatar}` }}
              style={styles.avatarIcon}
            />
          ) : (
            <AvatarICon style={styles.avatarIcon} />
          )}
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

        {/* <View style={styles.boxInput}>
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
        </View> */}

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
          avatar={avatarEdit}
          emailRef={emailEditRef}
          changeEmail={handleEditEmail}
          handleSalvar={handleEditSalvar}
          handleImg={handleImg}
        />

        <AlertModal
          visible={visible}
          message={modalMessage}
          success={modalSuccess}
          onPress={handleAlertModal}
          isLoadingModal={false}
          textButton={"CONTINUAR"}
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
  avatarIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default ProfileScreen;
