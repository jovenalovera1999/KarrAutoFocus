import api from "@/lib/api";

const prefix = "/api/buyer";

const BuyerService = {
  storeBuyer: async (data: any, carId: string | number) => {
    const res = await api.post(`${prefix}/storeBuyer`, data, {
      params: { car_id: carId },
    });
    return res;
  },
  updateBuyer: async (buyerId: string | number, data: any) => {
    const res = await api.put(`${prefix}/updateBuyer/${buyerId}`, data);
    return res;
  },
};

export default BuyerService;
