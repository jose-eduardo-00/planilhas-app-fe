import { http } from "../../config";

export default {
  createPlanilha: async (userId, name) => {
    try {
      const response = await http.post(
        "/planilha/register",
        {
          userId: userId,
          nome: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  getPlanilhaById: async (id) => {
    try {
      const response = await http.get(`/planilha/byId/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  getPlanilhas: async () => {
    try {
      const response = await http.get(`/planilha/`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,GET",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  createLinha: async (nome, tipo, data, valor, planilhaId) => {
    try {
      const response = await http.post(
        `/planilha/${planilhaId}/linhas`,
        {
          nome: nome,
          tipo: tipo,
          data: data,
          valor: valor,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  updateLinha: async (planilhaId, nome, tipo, data, valor) => {
    try {
      const response = await http.put(
        `/planilha/edit-linha/${planilhaId}`,
        {
          nome: nome,
          tipo: tipo,
          data: data,
          valor: valor,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,PUT",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  deleteLinha: async (planilhaId) => {
    try {
      const response = await http.delete(
        `/planilha/delete-linha/${planilhaId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,DELETE",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  deletePlanilha: async (planilhaId) => {
    try {
      const response = await http.delete(`/planilha/delete/${planilhaId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,DELETE",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
};
