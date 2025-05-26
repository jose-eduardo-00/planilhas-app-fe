import React, { useEffect, useRef, useState } from "react";
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
import IconFilter from "../../../assets/icon/trashIcon.svg";
import AlertModal from "../../components/modals/alertModal";
import api from "../../../service/api/planilha/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import EditRowPlanilhaModal from "../../components/modals/editRowPlanilhaModal";
import DeleteModal from "../../components/modals/deleteModal";

const PlanilhaEditScreen = () => {
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingResumo, setIsLoadingResumo] = useState(false);
  const [isLoadingPlus, setIsLoadingPlus] = useState(false);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [isLoadingModalAdd, setIsLoadingModalAdd] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [planilha, setPlanilha] = useState(null);

  // ModalAdd
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [idLine, setIdLine] = useState("");

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

  const [isLoadingModalAlert, setIsLoadingModalAlert] = useState(false);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalAlertSuccess, setModalAlertSuccess] = useState(false);
  const [modalAlertMessage, setModalAlertMessage] = useState("");
  const [textButton, setTextButton] = useState("");

  // modal de deletar
  const [isLoadingModalDelete, setIsLoadingModalDelete] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);
  const [modalDeleteMessage, setModalDeleteMessage] = useState("");
  const [textButtonDelete, setTextButtonDelete] = useState("");
  const [typeForDelete, setTypeForDelete] = useState("");

  const route = useRoute();

  const { id } = route.params;

  const navigation = useNavigation();

  const handleGetPlanilha = () => {
    api.getPlanilhaById(id).then((res) => {
      if (res.status === 200) {
        setPlanilha(res.data.planilha);
      }
    });
  };

  useEffect(() => {
    handleGetPlanilha();
  }, []);

  const handleEdit = (item) => {
    setIdLine(item.id);
    handleName(item.nome);
    handleType(item.tipo);
    handleDate(item.data);
    handleValue(item.valor);

    setModalVisibleAdd(true);
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
    setIsLoadingModalAdd(true);

    if (
      name == "" ||
      type == "" ||
      date.length < 10 ||
      value == "" ||
      value === "R$ 0,00"
    ) {
      setIsLoadingModalAdd(false);

      setModalAlertSuccess(false);
      setTextButton("FECHAR");
      setModalAlertMessage("Os campos não podem ficar vazios!");
      setModalAlertVisible(true);
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

      api
        .updateLinha(
          idLine,
          name,
          type,
          convertToISO(date),
          normalizeCurrency(value)
        )
        .then((res) => {
          if (res.status === 200) {
            handleGetPlanilha();
            setIsLoadingModalAdd(false);

            setModalAlertSuccess(true);
            setTextButton("CONTINUAR");
            setModalAlertMessage("Editado com sucesso!");
            setModalAlertVisible(true);
          } else {
            setIsLoadingModalAdd(false);

            setModalAlertSuccess(false);
            setTextButton("FECHAR");
            setModalAlertMessage(
              "Ocorreu um erro ao tentar atualizar os dados, tente novamente mais tarde!"
            );
            setModalAlertVisible(true);
          }
        });
    }
  };

  const handleModalEdit = () => {
    setModalVisibleAdd(!modalVisibleAdd);
  };

  const handleName = (t) => {
    setName(t);
  };

  const handleType = (t) => {
    setType(t);
  };

  const handleDate = (t) => {
    let value = t;

    // Se for formato ISO completo: yyyy-mm-ddTHH:mm:ss.sssZ
    if (/^\d{4}-\d{2}-\d{2}T/.test(t)) {
      const dateOnly = t.split("T")[0]; // Pega só a parte "2025-05-10"
      const [yyyy, mm, dd] = dateOnly.split("-");
      value = `${dd}/${mm}/${yyyy}`;
      setDate(value);
      return;
    }

    // Se for do tipo yyyy-mm-dd simples
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
      const [yyyy, mm, dd] = t.split("-");
      value = `${dd}/${mm}/${yyyy}`;
      setDate(value);
      return;
    }

    // Entrada do usuário
    let cleaned = value.replace(/\D/g, "");
    cleaned = cleaned.slice(0, 8);

    if (cleaned.length >= 5) {
      value = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
        4
      )}`;
    } else if (cleaned.length >= 3) {
      value = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      value = cleaned;
    }

    setDate(value);
  };

  const handleValue = (t) => {
    let raw = t;

    // Se vier do backend como número (ex: 43 ou "43.50")
    if (typeof raw === "number" || /^\d+(\.\d{1,2})?$/.test(raw)) {
      const num = Number(raw).toFixed(2).replace(".", ",");
      setValue(`R$ ${num}`);
      return;
    }

    // Caso contrário, trata como entrada do input (ex: digitando "4", "43", "4300" etc)
    const cleaned = raw.replace(/\D/g, "");

    if (!cleaned) {
      setValue("R$ 0,00");
      return;
    }

    const number = (Number(cleaned) / 100).toFixed(2);
    const formatted = "R$ " + number.replace(".", ",");

    setValue(formatted);
  };

  const handleModalDeleteVisible = () => {
    setModalAlertSuccess(false);
    setModalAlertMessage("Deseja apagar a planilha nome da planilha");
    setModalAlertVisible(true);
  };

  const handleAlertModal = () => {
    if (modalAlertSuccess) {
      setModalAlertMessage("");
      setModalAlertVisible(false);
      setModalVisibleAdd(false);
    } else {
      setModalAlertMessage("");
      setModalAlertVisible(false);
    }
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

  const handleDeleteModal = (tipo) => {
    if (tipo == 2) {
      setModalDeleteMessage("Deseja apagar essa linha da planilha?");
      setTypeForDelete(2);
    } else {
      setTypeForDelete(1);
      setModalDeleteMessage("Deseja apagar essa planilha?");
    }

    setTextButtonDelete("APAGAR");
    setModalDeleteSuccess(false);
    setModalDeleteVisible(!modalDeleteVisible);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteVisible(false);
  };

  const handleDelete = () => {
    setIsLoadingModalDelete(true);

    if (typeForDelete == 2) {
      api.deleteLinha(idLine).then((res) => {
        if (res.status === 200) {
          handleGetPlanilha();
          setModalDeleteMessage("linha apagada com sucesso.");
          setModalDeleteSuccess(true);

          setIsLoadingModalDelete(false);

          setTimeout(() => {
            setModalDeleteVisible(false);
            setModalVisibleAdd(false);
          }, 2000);
        } else {
          setIsLoadingModalDelete(false);
          setModalDeleteMessage(
            "Ocorreu uma falha ao tentar apagar a linha, tente novamente mais tarde."
          );
        }
      });
    } else {
      api.deletePlanilha(id).then((res) => {
        if (res.status === 200) {
          setModalDeleteMessage("Planilha apagada com sucesso.");
          setModalDeleteSuccess(true);

          setTimeout(() => {
            navigation.reset({
              routes: [{ name: "Drawer" }],
            });
            setModalDeleteVisible(false);
            setIsLoadingModalDelete(false);
            setModalVisibleAdd(false);
          }, 2000);
        } else {
          setIsLoadingModalDelete(false);
          setModalDeleteMessage(
            "Ocorreu uma falha ao tentar apagar a planilha, tente novamente mais tarde."
          );
        }
      });
    }
  };

  const renderRow = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => handleEdit(item)}>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{formatDate(item.data)}</Text>
      <Text style={styles.cell}>{item.tipo}</Text>
      <Text style={styles.cell}>{formatCurrency(item.valor)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        translucent={true}
        backgroundColor={Colors.white}
      />
      <View style={styles.boxTitle}>
        <Text style={styles.title}>{planilha && planilha.nome}</Text>
        <TouchableOpacity onPress={handleDeleteModal}>
          <IconFilter style={styles.iconFilter} />
        </TouchableOpacity>
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

      {/* <View style={styles.boxButton}>
        <MainButton
          text={"SALVAR"}
          onPress={handleEdit}
          isLoading={isLoadingEdit}
        />
      </View> */}

      <EditRowPlanilhaModal
        isLoadingModal={isLoadingModalAdd}
        onPress={handleModalAdd}
        visible={modalVisibleAdd}
        textButton={"SALVAR"}
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
        handleModalDelete={handleDeleteModal}
      />

      <AlertModal
        visible={modalAlertVisible}
        message={modalAlertMessage}
        success={modalAlertSuccess}
        onPress={handleAlertModal}
        isLoadingModal={isLoadingModalAlert}
        textButton={textButton}
      />

      <DeleteModal
        visible={modalDeleteVisible}
        message={modalDeleteMessage}
        success={modalDeleteSuccess}
        onPress={handleDelete}
        isLoadingModal={isLoadingModalDelete}
        textButton={textButtonDelete}
        cancelPress={handleCloseModalDelete}
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
    marginLeft: 20,
    marginBottom: -4,
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
    height: 52,
    width: "80%",
    alignSelf: "center",
    marginBottom: 60,
  },
});

export default PlanilhaEditScreen;
