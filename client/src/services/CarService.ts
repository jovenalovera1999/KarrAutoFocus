import api from "@/lib/api";

const prefix = "/car";

const CarService = {
  loadCarReferences: async () => {
    const res = await api.get(`${prefix}/loadCarReferences`);
    return res;
  },
};

export default CarService;
