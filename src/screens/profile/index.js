import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainInput from "../../components/inputs/mainInput";
import MainButton from "../../components/buttons/mainButton";
import { useNavigation } from "@react-navigation/native";
import AvatarICon from "../../../assets/icon/avatarIcon.svg";


const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [income, setIncome] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const incomeRef = useRef(null);

  const navigation = useNavigation();

  const handleEdit = () => {
    setIsLoading(true);

    console.log("Perfil atualizado:", {
      Nome: name,
      Email: email,
      "Renda Mensal": income,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.avatarContainer}>
            <AvatarICon width={80} height={80} style={styles.avatarIcon} />
        </View>

        <View style={styles.boxInput}>
          <Text style={styles.titleInput}>Nome</Text>
          <MainInput
            onChange={setName}
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
            onChange={setEmail}
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
            onChange={setIncome}
            placeholder="R$"
            text={income}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.boxButton}>
          <MainButton text="EDITAR" onPress={handleEdit} isLoading={isLoading} />
        </View>
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
