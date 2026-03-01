import api from "@/lib/api";

const prefix = "/office_expense";

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
  updateOfficeExpense: async (officeExpenseId: string | number, data: any) => {
    const res = await api.put(
      `${prefix}/updateOfficeExpense/${officeExpenseId}`,
      data,
    );
    return res;
  },
  deleteOfficeExpense: async (officeExpenseId: string | number) => {
    const res = await api.delete(
      `${prefix}/deleteOfficeExpense/${officeExpenseId}`,
    );
    return res;
  },
};

export default OfficeExpenseService;
