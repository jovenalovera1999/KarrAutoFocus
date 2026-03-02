import api from "@/lib/api";

const prefix = "/car";

const CarService = {
  loadAllUnits: async (page: number, search?: string) => {
    const res = await api.get(`${prefix}/loadAllUnits`, {
      params: { page: page, ...(search ? { search: search } : {}) },
    });
    return res;
  },
  loadAvailableUnits: async (page: number, search?: string) => {
    const res = await api.get(`${prefix}/loadAvailableUnits`, {
      params: { page: page, ...(search ? { search: search } : {}) },
    });
    return res;
  },
  loadReservedUnits: async (page: number, search?: string) => {
    const res = await api.get(`${prefix}/loadReservedUnits`, {
      params: { page: page, ...(search ? { search: search } : {}) },
    });
    return res;
  },
  loadSoldUnits: async (page: number, search?: string) => {
    const res = await api.get(`${prefix}/loadSoldUnits`, {
      params: { page: page, ...(search ? { search: search } : {}) },
    });
    return res;
  },
  loadCarReferences: async () => {
    const res = await api.get(`${prefix}/loadCarReferences`);
    return res;
  },
  getCar: async (carId: string | number, page?: number) => {
    const res = await api.get(`${prefix}/getCar/${carId}`, {
      params: { page: page },
    });
    return res;
  },
  storeCar: async (data: any) => {
    const res = await api.post(`${prefix}/storeCar`, data);
    return res;
  },
  updateCar: async (carId: string | number, data: any) => {
    const res = await api.put(`${prefix}/updateCar/${carId}`, data);
    return res;
  },
  deleteCar: async (carId: string | number) => {
    const res = await api.delete(`${prefix}/deleteCar/${carId}`);
    return res;
  },
};

export default CarService;
