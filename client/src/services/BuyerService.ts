import api from "@/lib/api";

const prefix = "/buyer";

const BuyerService = {
  storeBuyer: async (data: any) => {
    const res = await api.post(`${prefix}/storeBuyer`, data);
    return res;
  },
};

export default BuyerService;
