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

const PlanilhasScreen = () => {
  const [visible, setVisible] = useState(false);

  const [textName, setTextName] = useState("");
  const [textYear, setTextYear] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);
  const [visibleCountTemp, setVisibleCountTemp] = useState(2);

  const [planilhas, setPlanilhas] = useState(null);

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
    console.log(visibleCountTemp);
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
        {planilhas &&
          planilhas
            .filter((item) =>
              item.nome.toLowerCase().includes(textName.toLowerCase())
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
              <Text style={styles.textMore}>Ver mais</Text>
            </TouchableOpacity>
          )}
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
