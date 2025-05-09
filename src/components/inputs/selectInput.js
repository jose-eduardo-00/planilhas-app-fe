import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../../../constants/colors/colors";

const MainSelect = ({ value, onChange, options, fail, success }) => {
  return (
    <View
      style={[
        styles.pickerContainer,
        {
          borderColor: fail
            ? Colors.red
            : success
            ? Colors.green
            : Colors.black,
        },
      ]}
    >
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        style={styles.picker}
        dropdownIconColor={Colors.gray}
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
    color: Colors.black,
  },
});

export default MainSelect;
