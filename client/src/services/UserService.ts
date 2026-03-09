import api from "@/lib/api";

const prefix = "/api/user";

const UserService = {
  loadUsers: async (page: number, search?: string) => {
    const res = await api.get(`${prefix}/loadUsers`, {
      params: { page: page, ...(search ? { search: search } : {}) },
    });
    return res;
  },
  loadUserReferences: async () => {
    const res = await api.get(`${prefix}/loadUserReferences`);
    return res;
  },
  storeUser: async (data: any) => {
    const res = await api.post(`${prefix}/storeUser`, data);
    return res;
  },
  updateUser: async (userId: string | number, data: any) => {
    const res = await api.put(`${prefix}/updateUser/${userId}`, data);
    return res;
  },
  deleteUser: async (userId: string | number) => {
    const res = await api.delete(`${prefix}/deleteUser/${userId}`);
    return res;
  },
};

export default UserService;
