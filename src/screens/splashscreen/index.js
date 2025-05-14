import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { loadFonts } from "../../../constants/fonts/fonts";
import { Colors } from "../../../constants/colors/colors";
import { useGlobalContext } from "../../context/context";

const SplashScreen = () => {
  const navigation = useNavigation();
  const fontsLoaded = loadFonts(); // Carregar as fontes

  const { token } = useGlobalContext();

  useEffect(() => {
    if (fontsLoaded) {
      handleGetToken();
    }
  }, [fontsLoaded]);

  const handleGetToken = async () => {
    if (!token) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Drawer");
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: "Roboto-Bold", // Usando a fonte nomeada
    fontSize: 24,
  },
});

export default SplashScreen;
