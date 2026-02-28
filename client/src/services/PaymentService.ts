import api from "@/lib/api";

const prefix = "/payment";

const PaymentService = {
  storePayment: async (
    data: any,
    carId?: string | number,
    buyerId?: string | number,
    paymentBreakdownId?: string | number,
  ) => {
    const res = await api.post(`${prefix}/storePayment`, data, {
      params: {
        ...(carId ? { car_id: carId } : {}),
        ...(buyerId ? { buyer_id: buyerId } : {}),
        ...(paymentBreakdownId
          ? { payment_breakdown_id: paymentBreakdownId }
          : {}),
      },
    });
    return res;
  },
};

export default PaymentService;
