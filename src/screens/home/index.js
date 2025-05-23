import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors/colors";
import MainCard from "../../components/cards/mainCard";
import ButtonCard from "../../components/cards/buttonCards";
import IconFile from "../../../assets/icon/fileIcon.svg";
import IconPlus from "../../../assets/icon/plusBlackIcon.svg";
import IconGraph from "../../../assets/icon/graphBlackIcon.svg";
import IconPerfil from "../../../assets/icon/perfilBlackIcon.svg";
import IconNotification from "../../../assets/icon/notification.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../../../service/api/planilha/index";

const HomeScreen = () => {
  const [planilha, setPlanilha] = useState(null);

  const navigation = useNavigation();

  const handleNotificacoes = () => {
    navigation.navigate("Notification");
  };
  const handlePlanilha = () => {
    navigation.navigate("Planilhas");
  };
  const handlePlus = () => {
    navigation.navigate("AddPlanilha");
  };
  const handleGraph = () => {};
  const handlePerfil = () => {
    navigation.navigate("Profile");
  };

  const handlePlanilhaPreview = (id) => {
    navigation.navigate("PlanilhaPreview", { id: id });
  };
  const options = [
    {
      id: "1",
      icon: IconNotification,
      name: "Notificações",
      onPress: handleNotificacoes,
    },
    { id: "2", icon: IconFile, name: "Planilhas", onPress: handlePlanilha },
    { id: "3", icon: IconPlus, name: "Criar Planilha", onPress: handlePlus },
    { id: "4", icon: IconGraph, name: "Gráficos", onPress: handleGraph },
    { id: "5", icon: IconPerfil, name: "Perfil", onPress: handlePerfil },
  ];

  const renderItem = ({ item }) => (
    <ButtonCard Icon={item.icon} name={item.name} onPress={item.onPress} />
  );

  const handleGetPlanilha = () => {
    api.getPlanilhas().then((res) => {
      if (res.status === 200) {
        const todasPlanilhas = res.data;

        const planilhaMaisAtual = todasPlanilhas.reduce((maisAtual, atual) => {
          return new Date(atual.updatedAt) > new Date(maisAtual.updatedAt)
            ? atual
            : maisAtual;
        });

        setPlanilha(planilhaMaisAtual);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetPlanilha();
    }, [])
  );

  return (
    <View style={styles.container}>
      {planilha && (
        <View style={styles.boxRecent}>
          <Text style={styles.titleRecent}>Visualizado Recentemente</Text>
          <MainCard
            name={planilha.nome}
            date={planilha.createdAt}
            onPress={() => handlePlanilhaPreview(planilha.id)}
          />
        </View>
      )}

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem
        contentContainerStyle={styles.boxOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 50,
  },
  boxRecent: {
    paddingHorizontal: 26,
    marginBottom: 40,
  },
  titleRecent: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    color: Colors.black,
    marginBottom: 15,
  },
  boxOptions: {
    marginTop: 0,
    marginLeft: 35,
    flexDirection: "row",
    gap: 12,
  },
});

export default HomeScreen;
