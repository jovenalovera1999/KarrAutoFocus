import api from "@/lib/api";

const prefix = "/expense";

const OfficeExpenseService = {
  loadOfficeExpenses: async (
    page: number,
    dateFrom?: string,
    dateTo?: string,
  ) => {
    const res = await api.get(`${prefix}/loadOfficeExpenses`, {
      params: {
        page: page,
        ...(dateFrom && dateTo ? { date_from: dateFrom, date_to: dateTo } : {}),
      },
    });
    return res;
  },
  storeOfficeExpense: async (data: any) => {
    const res = await api.post(`${prefix}/storeOfficeExpense`, data);
    return res;
  },
};

export default OfficeExpenseService;
