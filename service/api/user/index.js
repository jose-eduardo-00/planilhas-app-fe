import { http } from "../../config";

export default {
  createUser: async (name, email, senha, expoToken) => {
    try {
      const response = await http.post(
        "/users/register",
        {
          name: name,
          email: email,
          senha: senha,
          renda_mensal: "00",
          expoToken: expoToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  sendEmailResetPass: async (email) => {
    try {
      const response = await http.post(
        "/users/resend-password",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  changePassword: async (id, senha) => {
    try {
      const response = await http.put(
        `/users/update-password/${id}`,
        {
          senha: senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  updateBaseDate: async (id, salario, outras_fontes) => {
    try {
      const response = await http.put(
        `/users/update-data/${id}`,
        {
          salario: salario,
          outras_fontes: outras_fontes,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
          },
        }
      );

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
  updateUser: async (id, name, email, avatar) => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (avatar) {
        formData.append("avatar", {
          uri: avatar.uri,
          name: avatar.fileName,
          type: avatar.mimeType,
        });
      }

      const response = await http.put(`/users/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "OPTIONS,PUT",
        },
      });

      return response;
    } catch (error) {
      return error.response || error.message || error;
    }
  },
};
