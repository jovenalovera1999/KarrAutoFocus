import api from "@/lib/api";

const prefix = "/user";

const UserService = {
  loadUserReferences: async () => {
    const res = await api.get(`${prefix}/loadUserReferences`);
    return res;
  },
  storeUser: async (data: any) => {
    const res = await api.post(`${prefix}/storeUser`, data);
    return res;
  },
};

export default UserService;
