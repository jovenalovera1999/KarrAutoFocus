import api from "@/lib/api";

const prefix = "/api/unit_expense";

const UnitExpenseService = {
  storeUnitExpense: async (data: any) => {
    const res = await api.post(`${prefix}/storeUnitExpense`, data);
    return res;
  },
};

export default UnitExpenseService;
