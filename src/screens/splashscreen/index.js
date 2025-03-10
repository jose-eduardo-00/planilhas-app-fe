import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleGetToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    handleGetToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
