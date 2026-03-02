import api from "@/lib/api";

const prefix = "/report";

const ReportService = {
  loadReports: async () => {
    const res = await api.get(`${prefix}/loadReports`);
    return res;
  },
};

export default ReportService;
