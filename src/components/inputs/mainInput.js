import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import Eye from "../../../assets/icon/eye.svg";
import ClosedEye from "../../../assets/icon/closedEye.svg";

const MainInput = forwardRef(
  (
    {
      onChange,
      text,
      isPassword,
      isPasswordVisible,
      placeholder,
      isPasswordChange,
      onSubmitEditing,
      returnKeyType = "done",
    },
    ref
  ) => {
    return (
      <View style={styles.inputArea}>
        {isPassword ? (
          <>
            <TextInput
              ref={ref} // Adicionando referência
              onChangeText={onChange}
              placeholder={placeholder}
              value={text}
              style={styles.inputPass}
              secureTextEntry={isPasswordVisible}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing} // Quando o usuário aperta "OK"
              blurOnSubmit={false} // Mantém o teclado aberto
            />
            <TouchableOpacity onPress={isPasswordChange}>
              {isPasswordVisible ? <ClosedEye /> : <Eye />}
            </TouchableOpacity>
          </>
        ) : (
          <TextInput
            ref={ref} // Adicionando referência
            onChangeText={onChange}
            placeholder={placeholder}
            value={text}
            style={styles.input}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing} // Muda para o próximo input
            blurOnSubmit={false}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputArea: {
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 15,
    height: 52,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
  },
  inputPass: {
    width: "90%",
  },
});

export default MainInput;
