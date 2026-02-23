import api from "@/lib/api";

const prefix = "/unit_expense";

const UnitExpenseService = {
  storeUnitExpense: async (data: any) => {
    const res = await api.post(`${prefix}/storeUnitExpense`, data);
    return res;
  },
};

export default UnitExpenseService;
