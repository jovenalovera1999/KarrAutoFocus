import api from "@/lib/api";

const prefix = "/expense";

const ExpenseService = {
  loadExpenses: async (page: number, date_from?: string, date_to?: string) => {
    const res = await api.get(`${prefix}/loadExpenses`, {
      params: {
        page: page,
        ...(date_from && date_to
          ? { date_from: date_from, date_to: date_to }
          : {}),
      },
    });
    return res;
  },
  storeExpense: async (data: any) => {
    const res = await api.post(`${prefix}/storeExpense`, data);
    return res;
  },
};

export default ExpenseService;
