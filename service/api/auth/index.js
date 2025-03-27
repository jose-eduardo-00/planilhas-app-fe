import { http } from "../../config";

export default {
  verifyCode: async (code, id) => {
    try {
      const response = await http.post(
        `/auth/verify/${id}`,
        {
          code: code,
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
  loginUser: async (email, senha) => {
    try {
      const response = await http.post(
        "/auth/login",
        { 
          email, 
          senha 
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
  logout: async (userId, token) => {
    try {
      const response = await http.post(
        "/auth/logout", 
        {
          userId: userId, 
          token: token, 
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
  }
};
