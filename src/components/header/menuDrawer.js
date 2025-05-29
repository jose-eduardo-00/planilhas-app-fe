import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AvatarICon from "../../../assets/icon/avatarIcon.svg";
import IconPlanilha from "../../../assets/icon/planilhaIcon.svg";
import IconDados from "../../../assets/icon/dadosIcon.svg";
import IconConfig from "../../../assets/icon/config.svg";
import { Colors } from "../../../constants/colors/colors";
import MainButton from "../buttons/mainButton";
import api from "../../../service/api/auth/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertModal from "../modals/alertModal";
import { useGlobalContext } from "../../context/context";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../../../service/config";

const MenuDrawer = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { token, updateToken, theme } = useGlobalContext();

  const handleCheckToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.user.name);
      setUser(decoded.user);
      setAvatar(decoded.user.avatar);
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    if (token) {
      handleCheckToken();
    }
  }, [token]);

  //remove o token e faz o logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (!!token && !!user) {
        const userId = user.id;
        // logout do backend
        console.log(user);
        const response = await api.logout(userId, token);
        console.log(response.status, response.data);

        if (response.status === 200) {
          setIsLoading(false);

          updateToken(null);
          // await AsyncStorage.removeItem("token");
          // await AsyncStorage.removeItem("user");

          navigation.reset({
            routes: [{ name: "Login" }],
          });
        } else {
          setIsLoading(false);
          setModalMessage(
            "Falha ao tentar realizar o logout, tente novamente mais tarde!"
          );
          setModalSuccess(false);
          setVisible(true);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Falha ao tentar sair!");
    }
  };

  const handleAlertModal = () => {
    setVisible(!visible);
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const textColor = theme === "light" ? "#212121" : "#FFF";
  const iconColor = theme === "light" ? "#212121" : "#FFF";

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.boxPerfil}>
        <View>
          <Text style={[styles.name, { color: textColor }]}>
            {userName || "Usuário"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={[styles.textPerfil, { color: textColor }]}>
              Ver perfil
            </Text>
          </TouchableOpacity>
        </View>

        {avatar ? (
          <Image
            source={{ uri: `${baseUrl}/public/${avatar}` }}
            style={styles.avatarIcon}
          />
        ) : (
          <AvatarICon />
        )}
      </View>
      <View style={styles.div}></View>

      <TouchableOpacity
        style={styles.boxOptions}
        onPress={() => navigation.navigate("Planilhas")}
      >
        <IconPlanilha width={30} height={30} style={{ color: iconColor }} />
        <Text style={[styles.textOption, { color: textColor }]}>Planilhas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxOptions1}
        onPress={() => navigation.navigate("BaseData")}
      >
        <IconDados
          width={20}
          height={20}
          style={{ color: iconColor, marginLeft: 5, marginRight: 4 }}
        />
        <Text style={[styles.textOption, { color: textColor }]}>
          Dados Base
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.boxOptions1}
        onPress={() => navigation.navigate("Config")}
      >
        <IconConfig
          width={25}
          height={25}
          style={{ color: iconColor, marginLeft: 3, marginRight: 1 }}
        />
        <Text style={[styles.textOption, { color: textColor }]}>
          Configurações
        </Text>
      </TouchableOpacity>

      {/* btn logout*/}
      <View style={styles.boxButton}>
        <MainButton text="Sair" onPress={handleLogout} isLoading={isLoading} />
      </View>

      <AlertModal
        visible={visible}
        message={modalMessage}
        success={modalSuccess}
        onPress={handleAlertModal}
        isLoadingModal={isLoadingModal}
        textButton={"Entrar"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  boxPerfil: {
    // paddingHorizontal: 5,
    marginTop: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
  },
  div: {
    height: 2,
    backgroundColor: Colors.gray,
    width: "110%",
    alignSelf: "center",
    marginBottom: 60,
  },
  name: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: Colors.thirdBlack,
    marginBottom: 10,
  },
  textPerfil: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: Colors.thirdBlack,
    textAlign: "center",
  },
  boxOptions: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  boxOptions1: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginTop: 25,
  },
  textOption: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
  boxButton: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: 52,
  },
  avatarIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginLeft: 5,
  },
});

export default MenuDrawer;
