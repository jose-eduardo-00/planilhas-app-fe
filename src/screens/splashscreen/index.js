import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { loadFonts } from "../../../constants/fonts/fonts";

const SplashScreen = () => {
  const navigation = useNavigation();
  const fontsLoaded = loadFonts(); // Carregar as fontes

  useEffect(() => {
    if (fontsLoaded) {
      handleGetToken();
    }
  }, [fontsLoaded]);

  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      navigation.navigate("Drawer");
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
  },
  title: {
    fontFamily: "Roboto-Bold", // Usando a fonte nomeada
    fontSize: 24,
  },
});

export default SplashScreen;
