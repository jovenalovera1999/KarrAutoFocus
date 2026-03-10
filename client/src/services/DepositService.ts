import api from "@/lib/api";

const prefix = "/api/deposit";

const DepositService = {
  loadDeposits: async (page: number, dateFrom?: string, dateTo?: string) => {
    return await api.get(`${prefix}/loadDeposits`, {
      params: {
        page: page,
        ...(dateFrom && dateTo ? { date_from: dateFrom, date_to: dateTo } : {}),
      },
    });
  },
  storeDeposit: async (data: any) => {
    return await api.post(`${prefix}/storeDeposit`, data);
  },
  updateDeposit: async (depositId: string | number, data: any) => {
    return await api.put(`${prefix}/updateDeposit/${depositId}`, data);
  },
  deleteDeposit: async (depositId: string | number) => {
    return await api.delete(`${prefix}/deleteDeposit/${depositId}`);
  },
};

export default DepositService;
