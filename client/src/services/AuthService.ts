import api from "@/lib/api";

const prefix = "/api/auth";

const AuthService = {
  csrf: async () => {
    return await api.get("/sanctum/csrf-cookie");
  },
  getUser: async () => {
    return await api.get("/api/user");
  },
  login: async (username: string, password: string) => {
    return await api.post(`${prefix}/login`, { username, password });
  },
  logout: async () => {
    return await api.post(`${prefix}/logout`);
  },
};

export default AuthService;
