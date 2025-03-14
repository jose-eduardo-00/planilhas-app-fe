import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainCard from "../../components/cards/mainCard";
import ButtonCard from "../../components/cards/buttonCards";
import IconFile from "../../../assets/icon/fileIcon.svg";
import IconPlus from "../../../assets/icon/plusBlackIcon.svg";
import IconGraph from "../../../assets/icon/graphBlackIcon.svg";
import IconPerfil from "../../../assets/icon/perfilBlackIcon.svg";

const HomeScreen = () => {
  const handlePlanilha = () => {};
  const handlePlus = () => {};
  const handleGraph = () => {};
  const handlePerfil = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.boxRecent}>
        <Text style={styles.titleRecent}>Vizualizado Recentemente</Text>

        <MainCard name={"Nome da planilha"} date={"20/01/2001"} />
      </View>

      <View style={styles.boxOptions}>
        <ButtonCard
          Icon={IconFile}
          name={"Planilhas"}
          onPress={handlePlanilha}
        />
        <ButtonCard
          Icon={IconPlus}
          name={"Criar Planilha"}
          onPress={handlePlus}
        />
        <ButtonCard Icon={IconGraph} name={"Gráficos"} onPress={handleGraph} />
        <ButtonCard Icon={IconPerfil} name={"Perfil"} onPress={handlePerfil} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 50,
    paddingHorizontal: 26,
  },
  boxRecent: {},
  titleRecent: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
    marginBottom: 15,
  },
  boxOptions: {
    marginTop: 40,
    marginHorizontal: 15,
    flexDirection: "row",
    gap: 12,
  },
});

export default HomeScreen;
