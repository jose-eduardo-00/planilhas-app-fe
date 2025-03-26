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
};
