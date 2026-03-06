import api from "@/lib/api";

const prefix = "/auth";

const AuthService = {
  me: async () => {
    const res = await api.get(`${prefix}/me`);
    return res;
  },
  login: async (username: string, password: string) => {
    const res = await api.post(`${prefix}/login`, { username, password });
    return res;
  },
  logout: async () => {
    const res = await api.post(`${prefix}/logout`);
    return res;
  },
};

export default AuthService;
