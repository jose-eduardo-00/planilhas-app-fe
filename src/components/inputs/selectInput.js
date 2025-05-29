import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../../../constants/colors/colors";
import { useGlobalContext } from "../../context/context";

const MainSelect = ({ value, onChange, options, fail, success }) => {
  const { theme } = useGlobalContext();

  const textColor = theme === "light" ? "#212121" : "#FFF";

  return (
    <View
      style={[
        styles.pickerContainer,
        {
          borderColor: fail ? Colors.red : success ? Colors.green : textColor,
        },
      ]}
    >
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        style={[styles.picker, { color: textColor }]}
        dropdownIconColor={textColor}
      >
        <Picker.Item label="Selecione" value="" />
        {options.map((opt) => (
          <Picker.Item label={opt} value={opt} key={opt} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 2,
    borderRadius: 15,
    height: 52,
    justifyContent: "center",
    // paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    color: Colors.thirdBlack,
  },
});

export default MainSelect;
