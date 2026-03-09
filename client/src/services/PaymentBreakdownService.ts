import api from "@/lib/api";

const prefix = "/api/payment_breakdown";

const PaymentBreakdownService = {
  storePaymentBreakdown: async (data: any) => {
    const res = await api.post(`${prefix}/storePaymentBreakdown`, data);
    return res;
  },
  updatePaymentBreakdown: async (
    paymentBreakdownId: string | number,
    data: any,
  ) => {
    const res = await api.put(
      `${prefix}/updatePaymentBreakdown/${paymentBreakdownId}`,
      data,
    );
    return res;
  },
};

export default PaymentBreakdownService;
