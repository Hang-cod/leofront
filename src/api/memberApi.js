import axios from "axios";
import qs from "qs";

// ✅ 전체 baseURL에 /api/atelier 포함
const api = axios.create({
  baseURL: "https://www.atelierteam.shop/api/atelier",
  withCredentials: true,
});

// ✅ 모든 요청에 토큰 자동 포함
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

// ✅ 로그인 요청 (x-www-form-urlencoded)
export const loginPost = async (loginParam) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const formData = qs.stringify(loginParam); // 정확한 인코딩
  const res = await api.post("/login", formData, { headers });
  return res.data;
};

// ✅ 로그아웃 요청
export const logout = async () => {
  const res = await api.get("/logout");
  return res.data;
};

// ✅ 회원가입 요청 (JSON)
export const signupPost = async (signupParam) => {
  const headers = { "Content-Type": "application/json" };
  const res = await api.post("/register", signupParam, { headers });
  return res.data;
};

// ✅ 비밀번호 검증
export const verifyPassword = async ({ email, password }) => {
  try {
    const res = await api.post("/member/verify-password", {
      email,
      password,
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false };
  }
};
