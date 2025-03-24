import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import Eye from "../../../assets/icon/eye.svg";
import ClosedEye from "../../../assets/icon/closedEye.svg";
import RedEye from "../../../assets/icon/eyeRed.svg";
import ClosedRedEye from "../../../assets/icon/closedEyeRed.svg";
import GreenEye from "../../../assets/icon/eyeGreen.svg";
import ClosedGreenEye from "../../../assets/icon/closedEyeGreen.svg";

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
      fail,
      success,
      maxLength,
      keyboardType,
      cap,
    },
    ref
  ) => {
    return (
      <View
        style={[
          styles.inputArea,
          {
            borderColor: fail
              ? Colors.red
              : success
              ? Colors.green
              : Colors.black,
          },
        ]}
      >
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
              maxLength={maxLength}
              keyboardType={keyboardType}
            />
            <TouchableOpacity onPress={isPasswordChange}>
              {isPasswordVisible ? (
                fail ? (
                  <ClosedRedEye />
                ) : success ? (
                  <ClosedGreenEye />
                ) : (
                  <ClosedEye />
                )
              ) : fail ? (
                <RedEye />
              ) : success ? (
                <GreenEye />
              ) : (
                <Eye />
              )}
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
            maxLength={maxLength}
            keyboardType={keyboardType}
            autoCapitalize={cap}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputArea: {
    borderWidth: 2,
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
