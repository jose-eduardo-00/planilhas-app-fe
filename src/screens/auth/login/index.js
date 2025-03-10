import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../../constants/colors/colors";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
});

export default LoginScreen;
