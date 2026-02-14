import api from "@/lib/api";

const prefix = "/user";

const UserService = {
  storeUser: async (data: any) => {
    const res = await api.post(`${prefix}/storeUser`, data);
    return res;
  },
};

export default UserService;
