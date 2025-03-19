import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import IconFilter from "../../../assets/icon/filterIcon.svg";
import MainCard from "../../components/cards/mainCard";
import MenuBottomModal from "../../components/modals/menuBottomModal";
import AlertModal from "../../components/modals/alertModal";

const PlanilhasScreen = () => {
  const [visible, setVisible] = useState(false);

  const [textName, setTextName] = useState("");
  const [textYear, setTextYear] = useState("");

  const handleChangeTextName = (t) => {
    setTextName(t);
  };

  const handleChangeTextYear = (t) => {
    setTextYear(t);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Planilhas</Text>
        <TouchableOpacity onPress={handleVisibleModal}>
          <IconFilter style={styles.iconFilter} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <MainCard name={"Nome da planilha"} date={"20/01/2001"} />
        <MainCard name={"Nome da planilha"} date={"20/01/2001"} />
        <MainCard name={"Nome da planilha"} date={"20/01/2001"} />
        <MainCard name={"Nome da planilha"} date={"20/01/2001"} />

        <TouchableOpacity style={styles.buttonMore}>
          <Text style={styles.textMore}>Ver mais</Text>
        </TouchableOpacity>
      </ScrollView>

      <MenuBottomModal
        onPress={handleVisibleModal}
        visible={visible}
        textName={textName}
        textYear={textYear}
        onChangeName={handleChangeTextName}
        onChangeYear={handleChangeTextYear}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
    paddingHorizontal: 25,
  },
  boxTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Regular",
  },
  iconFilter: {
    marginRight: -60,
    marginLeft: 30,
    marginBottom: -5,
  },
  scrollContainer: {
    paddingBottom: 30,
    marginTop: 30,
    gap: 20,
  },
  buttonMore: {
    alignSelf: "center",
  },
  textMore: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
  },
});

export default PlanilhasScreen;
