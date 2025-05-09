import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors/colors";
import SecondButton from "../../components/buttons/secondButton";
import PlusButton from "../../components/buttons/plusButton";
import ResumoModal from "../../components/modals/resumoModal";
import AddRowPlanilhaModal from "../../components/modals/addRowPLanilhaModal";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import api from "../../../service/api/planilha/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlanilhaPreviewScreen = () => {
  const [user, setUser] = useState(null);
  const [planilha, setPlanilha] = useState(null);
  const [valorTotal, setValorTotal] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [renda, setRenda] = useState(0);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingResumo, setIsLoadingResumo] = useState(false);
  const [isLoadingPlus, setIsLoadingPlus] = useState(false);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [isLoadingModalAdd, setIsLoadingModalAdd] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  // ModalAdd
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  const [nameFail, setNameFail] = useState(false);
  const [typeFail, setTypeFail] = useState(false);
  const [dateFail, setDateFail] = useState(false);
  const [valueFail, setValueFail] = useState(false);

  const [nameSuccess, setNameSuccess] = useState(false);
  const [typeSuccess, setTypeSuccess] = useState(false);
  const [dateSuccess, setDateSuccess] = useState(false);
  const [valueSuccess, setValueSuccess] = useState(false);

  const typeRef = useRef(null);
  const dateRef = useRef(null);
  const valueRef = useRef(null);

  const route = useRoute();

  const navigation = useNavigation();

  const { id } = route.params;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.reset({
  //         routes: [{ name: "Drawer" }],
  //       });
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       onBackPress
  //     );

  //     return () => backHandler.remove(); // <-- corrigido aqui
  //   }, [])
  // );

  const formatCurrencyValue = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleToken = async () => {
    const user = await AsyncStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setRenda(parsedUser.renda_mensal);
    } else {
      return;
    }
  };

  const handleGetPlanilha = () => {
    api.getPlanilhaById(id).then((res) => {
      if (res.status === 200) {
        setPlanilha(res.data.planilha);
        setValorTotal(res.data.valorTotalFormatado);
      }
    });
  };

  useEffect(() => {
    handleGetPlanilha();

    handleToken();
  }, []);

  useEffect(() => {
    if (renda && valorTotal !== 0) {
      const saldo = renda - valorTotal;

      setSaldo(saldo);
    }
  }, [renda, valorTotal]);

  const handleEdit = () => {
    navigation.navigate("PlanilhaEdit");
  };

  const handleResumo = () => {
    handleModal();
  };

  const handlePlus = () => {
    handleModalAdd();
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleModalAdd = () => {
    if (
      name == "" ||
      type == "" ||
      date.length < 10 ||
      value == "" ||
      value === "R$ 0,00"
    ) {
      setName("");
      setType("");
      setDate("");
      setValue("");
      setValueFail(false);
      setValueSuccess(false);
      setDateFail(false);
      setDateSuccess(false);
      setTypeFail(false);
      setTypeSuccess(false);
      setNameFail(false);
      setNameSuccess(false);
    }
    setModalVisibleAdd(!modalVisibleAdd);
  };

  const handleSalvarConta = () => {
    setIsLoadingModalAdd(true);

    if (
      name == "" ||
      type == "" ||
      date.length < 10 ||
      value == "" ||
      value === "R$ 0,00"
    ) {
      if (name == "") {
        setNameSuccess(false);
        setNameFail(true);
      } else {
        setNameFail(false);
        setNameSuccess(true);
      }
      if (type == "") {
        setTypeSuccess(false);
        setTypeFail(true);
      } else {
        setTypeFail(false);
        setTypeSuccess(true);
      }
      if (date.length < 10) {
        setDateSuccess(false);
        setDateFail(true);
      } else {
        setDateFail(false);
        setDateSuccess(true);
      }
      if (value == "" || value === "R$ 0,00") {
        setValueSuccess(false);
        setValueFail(true);
      } else {
        setValueFail(false);
        setValueSuccess(true);
      }

      setIsLoadingModalAdd(false);
    } else {
      const convertToISO = (dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
      };
      const normalizeCurrency = (val) => {
        return Number(
          val.replace("R$ ", "").replace(".", "").replace(",", ".")
        );
      };

      //campos
      setValueFail(false);
      setValueSuccess(true);
      setDateFail(false);
      setDateSuccess(true);
      setTypeFail(false);
      setTypeSuccess(true);
      setNameFail(false);
      setNameSuccess(true);

      api
        .createLinha(
          name,
          type,
          convertToISO(date),
          normalizeCurrency(value),
          planilha.id
        )
        .then((res) => {
          if (res.status === 201) {
            handleGetPlanilha();
            setIsLoadingModalAdd(false);
            setModalVisibleAdd(!modalVisibleAdd);

            setName("");
            setType("");
            setDate("");
            setValue("");
            setValueFail(false);
            setValueSuccess(false);
            setDateFail(false);
            setDateSuccess(false);
            setTypeFail(false);
            setTypeSuccess(false);
            setNameFail(false);
            setNameSuccess(false);
          } else {
            setIsLoadingModalAdd(false);

            setValueFail(true);
            setValueSuccess(false);
            setDateFail(true);
            setDateSuccess(false);
            setTypeFail(true);
            setTypeSuccess(false);
            setNameFail(true);
            setNameSuccess(false);
          }
        });
    }
  };

  const handleName = (t) => {
    setName(t);
  };

  const handleType = (t) => {
    setType(t);
  };

  const handleDate = (t) => {
    // Remove tudo que não for número
    let cleaned = t.replace(/\D/g, "");

    // Limita a 8 dígitos
    if (cleaned.length > 8) {
      cleaned = cleaned.slice(0, 8);
    }

    // Adiciona as barras conforme digita
    if (cleaned.length >= 5) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
        4
      )}`;
    } else if (cleaned.length >= 3) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    setDate(cleaned);
  };

  const handleValue = (t) => {
    // Remove tudo que não for número
    const cleaned = t.replace(/\D/g, "");

    // Converte para centavos e formata
    const number = (Number(cleaned) / 100).toFixed(2);

    // Formata com separador de milhar e "R$"
    const formatted = "R$ " + number.replace(".", ",");

    setValue(formatted);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (value) => {
    if (typeof value === "string") {
      // Se já começa com "R$", retorna como está
      if (value.startsWith("R$")) return value;

      // Tenta converter string para número
      const parsed = parseFloat(value.replace(",", "."));
      if (isNaN(parsed)) return "R$ 0,00";

      return parsed.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    if (typeof value === "number") {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    return "R$ 0,00"; // valor padrão em caso de erro
  };

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{formatDate(item.data)}</Text>
      <Text style={styles.cell}>{item.tipo}</Text>
      <Text style={styles.cell}>{formatCurrency(item.valor)}</Text>
    </View>
  );

  const formatCurrencyBRL = (value) => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>{planilha && planilha.nome}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerPlan}>
          <View style={styles.headerPlan}>
            <Text style={styles.titlePlan}>Nome</Text>
            <Text style={styles.titlePlan}>Vencimento</Text>
            <Text style={styles.titlePlan}>Tipo</Text>
            <Text style={styles.titlePlan}>Valor</Text>
          </View>
          {planilha && planilha.linhas.length > 0 && (
            <FlatList
              data={planilha.linhas}
              renderItem={renderRow}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.boxButton}>
          <SecondButton
            text={"EDITAR"}
            onPress={handleEdit}
            isLoading={isLoadingEdit}
          />
        </View>

        <View style={styles.boxButtonPlus}>
          <PlusButton onPress={handlePlus} isLoading={isLoadingPlus} />
        </View>

        <View style={styles.boxButton}>
          <SecondButton
            text={"RESUMO"}
            onPress={handleResumo}
            isLoading={isLoadingResumo}
          />
        </View>
      </View>

      <AddRowPlanilhaModal
        isLoadingModal={isLoadingModalAdd}
        onPress={handleModalAdd}
        visible={modalVisibleAdd}
        textButton={"ADICIONAR"}
        handleSalvar={handleSalvarConta}
        name={name}
        nameFail={nameFail}
        nameSuccess={nameSuccess}
        changeName={handleName}
        type={type}
        typeFail={typeFail}
        typeSuccess={typeSuccess}
        typeRef={typeRef}
        changeType={handleType}
        date={date}
        dateFail={dateFail}
        dateSuccess={dateSuccess}
        dateRef={dateRef}
        changeDate={handleDate}
        value={value}
        valueFail={valueFail}
        valueSuccess={valueSuccess}
        valueRef={valueRef}
        changeValue={handleValue}
      />

      <ResumoModal
        isLoadingModal={isLoadingModal}
        onPress={handleModal}
        visible={modalVisible}
        saldo={formatCurrencyBRL(saldo)}
        renda={formatCurrencyBRL(renda)}
        total={formatCurrencyBRL(valorTotal)}
        textButton={"FECHAR"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
  },
  boxTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto-Regular",
  },
  scrollContainer: {
    paddingBottom: 30,
    marginTop: 60,
    gap: 20,
  },
  containerPlan: {},
  headerPlan: {
    backgroundColor: Colors.black,
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titlePlan: {
    textAlign: "center",
    width: "25%",
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: Colors.white,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.black,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.black,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  footer: {
    backgroundColor: Colors.black,
    height: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  boxButton: {
    height: 35,
    width: "30%",
  },
  boxButtonPlus: {
    height: 35,
    width: 35,
  },
});

export default PlanilhaPreviewScreen;
