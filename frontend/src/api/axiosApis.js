import AddTeam from "../pages/AddTeam";
import { axiosInstance, axiosInstanceWithInterceptor } from "./axiosConfig";

export const AuthApi = {
  signIn: async (data) => {
    const response = await axiosInstance.request({
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
    const response = await axiosInstance.request({
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

export const ProtectedApi = {
  getTeams: async (encodedQuery) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/teams?${encodedQuery}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  addTeam: async (data) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/teams/create`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  getUsers: async (encodedQuery) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/users?${encodedQuery}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  addUser: async (data) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/users`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  searchUsers: async (query) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/users/search?query=${query}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  addUserToTeam: async (data) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/teams/addUser`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  systemLogs: async (encodedQuery) => {
    const response = await axiosInstanceWithInterceptor.request({
      url: `/logs?${encodedQuery}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
