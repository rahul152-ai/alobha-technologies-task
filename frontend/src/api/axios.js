import api from "./axiosConfig";

export const AuthApi = {
  signIn: async (data) => {
    const response = await api.request({
      url: "/auth/login",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  signUp: async (data) => {
    const response = await api.request({
      url: "/auth/register",
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
