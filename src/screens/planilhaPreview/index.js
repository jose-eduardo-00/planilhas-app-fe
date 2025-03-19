import React, { useRef, useState } from "react";
import {
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
import { useNavigation } from "@react-navigation/native";

const PlanilhaPreviewScreen = () => {
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

  const navigation = useNavigation();

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
    setModalVisibleAdd(!modalVisibleAdd);
  };

  const handleSalvarConta = () => {
    //por enquanto so fecha o modal

    setModalVisibleAdd(!modalVisibleAdd);
  };

  const handleName = (t) => {
    setName(t);
  };

  const handleType = (t) => {
    setType(t);
  };

  const handleDate = (t) => {
    setDate(t);
  };

  const handleValue = (t) => {
    setValue(t);
  };

  const data = [
    {
      id: "1",
      nome: "Nome da conta",
      vencimento: "20/01/2023",
      tipo: "Mensal",
      valor: "R$ 150,00",
    },
    {
      id: "2",
      nome: "Planilha 2",
      vencimento: "15/02/2023",
      tipo: "Anual",
      valor: "R$ 300,00",
    },
    {
      id: "3",
      nome: "Planilha 3",
      vencimento: "10/03/2023",
      tipo: "Único",
      valor: "R$ 200,00",
    },
  ];

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{item.vencimento}</Text>
      <Text style={styles.cell}>{item.tipo}</Text>
      <Text style={styles.cell}>{item.valor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Nome da Planilha</Text>
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

          <FlatList
            data={data}
            renderItem={renderRow}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // Mantém a rolagem do ScrollView externa
          />
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
        textButton={"FECHAR"}
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
        saldo={"2000,00"}
        renda={"2000,00"}
        total={"2000,00"}
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
    justifyContent: "space-around",
  },
  titlePlan: {
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
