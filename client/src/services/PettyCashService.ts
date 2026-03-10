import api from "@/lib/api";

const prefix = "/api/petty_cash";

export const PettyCashService = {
  loadPettyCash: async (page: number, dateFrom?: string, dateTo?: string) => {
    return await api.get(`${prefix}/loadPettyCash`, {
      params: {
        page: page,
        ...(dateFrom && dateTo ? { date_from: dateFrom, date_to: dateTo } : {}),
      },
    });
  },
  storePettyCash: async (data: any) => {
    return await api.post(`${prefix}/storePettyCash`, data);
  },
  updatePettyCash: async (pettyCashId: string | number, data: any) => {
    return await api.put(`${prefix}/updatePettyCash/${pettyCashId}`, data);
  },
  deletePettyCash: async (pettyCashId: string | number) => {
    return await api.delete(`${prefix}/deletePettyCash/${pettyCashId}`);
  },
};
