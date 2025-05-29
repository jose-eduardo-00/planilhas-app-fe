import React, { useEffect, useState } from "react";
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
import api from "../../../service/api/planilha/index";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../context/context";

const PlanilhasScreen = () => {
  const [visible, setVisible] = useState(false);

  const [textName, setTextName] = useState("");
  const [textYear, setTextYear] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);
  const [visibleCountTemp, setVisibleCountTemp] = useState(2);

  const [planilhas, setPlanilhas] = useState(null);

  const { theme } = useGlobalContext();

  const navigation = useNavigation();

  const handleGetPlanilhas = () => {
    api.getPlanilhas().then((res) => {
      if (res.status === 200) {
        setPlanilhas(res.data);
      }
    });
  };

  const getFilteredPlanilhas = () => {
    if (!planilhas) return [];

    const filtered = planilhas.filter((item) =>
      item.nome.toLowerCase().includes(textName.toLowerCase())
    );

    return filtered.slice(0, visibleCount);
  };

  useEffect(() => {
    handleGetPlanilhas();
  }, []);

  const handleChangeTextName = (t) => {
    if (t != "") {
      setVisibleCountTemp(visibleCount);
      setVisibleCount(planilhas.length);
    } else {
      setVisibleCount(visibleCountTemp);
    }
    setTextName(t);
  };

  const handleChangeTextYear = (t) => {
    setTextYear(t);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
  };

  const handlePlanilha = (item) => {
    navigation.navigate("PlanilhaPreview", { id: item.id });
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#212121";
  const textColor = theme === "light" ? "#212121" : "#FFF";

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        translucent={true}
        backgroundColor={backgroundColor}
      />
      <View style={styles.boxTitle}>
        <Text style={[styles.title, { color: textColor }]}>Planilhas</Text>
        <TouchableOpacity onPress={handleVisibleModal}>
          <IconFilter style={[styles.iconFilter, { color: textColor }]} />
        </TouchableOpacity>
      </View>

      {planilhas && planilhas.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {planilhas &&
            planilhas
              .filter(
                (item) =>
                  item.nome.toLowerCase().includes(textName.toLowerCase()) &&
                  new Date(item.createdAt)
                    .getFullYear()
                    .toString()
                    .includes(textYear)
              )
              .slice(0, visibleCount)
              .map((item) => (
                <MainCard
                  key={item.id}
                  name={item.nome}
                  date={item.createdAt}
                  onPress={() => handlePlanilha(item)}
                />
              ))}

          {planilhas &&
            planilhas.filter((item) =>
              item.nome.toLowerCase().includes(textName.toLowerCase())
            ).length > visibleCount && (
              <TouchableOpacity
                style={styles.buttonMore}
                onPress={() => setVisibleCount((prev) => prev + 1)}
              >
                <Text style={[styles.textMore, { color: textColor }]}>
                  Ver mais
                </Text>
              </TouchableOpacity>
            )}
        </ScrollView>
      ) : (
        <View style={styles.boxTextOffPlan}>
          <Text style={[styles.textOffPlan, { color: textColor }]}>
            Você ainda não tem planilhas criadas!
          </Text>
        </View>
      )}

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
  },
  boxTextOffPlan: {
    marginTop: 40,
    alignItems: "center",
  },
  textOffPlan: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});

export default PlanilhasScreen;
