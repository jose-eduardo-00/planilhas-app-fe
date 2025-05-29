import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import Eye from "../../../assets/icon/eye.svg";
import ClosedEye from "../../../assets/icon/closedEye.svg";
import RedEye from "../../../assets/icon/eyeRed.svg";
import ClosedRedEye from "../../../assets/icon/closedEyeRed.svg";
import GreenEye from "../../../assets/icon/eyeGreen.svg";
import ClosedGreenEye from "../../../assets/icon/closedEyeGreen.svg";
import { useGlobalContext } from "../../context/context";

const InputCode = forwardRef(
  (
    {
      onChange,
      text,
      placeholder,
      onSubmitEditing,
      returnKeyType = "done",
      fail,
      success,
      maxLength,
    },
    ref
  ) => {
    const { theme } = useGlobalContext();
    const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
    const textColor = theme === "light" ? "#212121" : "#FFF";
    return (
      <View
        style={[
          styles.inputArea,
          {
            borderColor: fail ? Colors.red : success ? Colors.green : textColor,
          },
        ]}
      >
        <TextInput
          ref={ref} // Adicionando referência
          onChangeText={onChange}
          placeholder={placeholder}
          value={text}
          style={[styles.input, { color: textColor }]}
          placeholderTextColor={textColor}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing} // Muda para o próximo input
          blurOnSubmit={false}
          maxLength={maxLength}
          keyboardType="number-pad"
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputArea: {
    borderBottomWidth: 2,
    borderRadius: 15,
    height: 52,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Roboto-Regular",
  },
});

export default InputCode;
