import api from "@/lib/api";

const prefix = "/payment_method";

const PaymentMethodService = {
  loadPaymentMethods: async () => {
    const res = await api.get(`${prefix}/loadPaymentMethods`);
    return res;
  },
};

export default PaymentMethodService;
