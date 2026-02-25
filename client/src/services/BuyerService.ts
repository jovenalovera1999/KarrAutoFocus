import api from "@/lib/api";

const prefix = "/buyer";

const BuyerService = {
  storeBuyer: async (carId: string | number, data: any) => {
    const res = await api.post(`${prefix}/storeBuyer/${carId}`, data);
    return res;
  },
};

export default BuyerService;
