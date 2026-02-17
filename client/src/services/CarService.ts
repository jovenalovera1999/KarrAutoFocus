import api from "@/lib/api";

const prefix = "/car";

const CarService = {
  loadAllUnits: async (page: number, search: string) => {
    const res = await api.get(`${prefix}/loadAllUnits`, {
      params: { page: page, ...(search ? { search: search } : {}) },
    });
    return res;
  },
  loadCarReferences: async () => {
    const res = await api.get(`${prefix}/loadCarReferences`);
    return res;
  },
  storeCar: async (data: any) => {
    const res = await api.post(`${prefix}/storeCar`, data);
    return res;
  },
};

export default CarService;
