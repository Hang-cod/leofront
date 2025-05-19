import axios from "axios";
import qs from "qs";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/atelier`;

const api = axios.create({
  baseURL: API_SERVER_HOST,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginPost = async (loginParam) => {
  console.log("loginPost:", loginParam);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const formData = qs.stringify(loginParam); // ✅ 정확한 인코딩

  const res = await axios.post(`${prefix}/login`, formData, { headers });

  console.log("res:", res);
  return res.data;
};

export const logout = async () => {
  const token = localStorage.getItem("accessToken");

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${prefix}/logout`, header);
  return res.data;
};

export const signupPost = async (signupParam) => {
  console.log("signupPost:", signupParam);

  const header = { headers: { "Content-Type": "application/json" } };

  const res = await axios.post(`${prefix}/register`, signupParam, header);
  return res.data;
};

export const verifyPassword = async ({ email, password }) => {
  try {
    const res = await api.post(`/api/atelier/member/verify-password`, {
      email,
      password,
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false };
  }
};
