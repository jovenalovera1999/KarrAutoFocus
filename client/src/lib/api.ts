import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  withXSRFToken: true,
});

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

api.interceptors.request.use(
  (config) => {
    const xsrfToken = getCookie("XSRF-TOKEN");

    if (xsrfToken && config.headers)
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);

    return config;
  },
  (error) => Promise.reject(error),
);

let isRedirecting = false;
let isLoggingOut = false;

export const setLoggingOut = (value: boolean) => {
  isLoggingOut = value;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !isLoggingOut &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/"
    ) {
      if (!isRedirecting) {
        isRedirecting = true;
        window.location.replace("/");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
