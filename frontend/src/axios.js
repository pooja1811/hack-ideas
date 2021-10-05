import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use((response) => {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 304
  ) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
});
export default axiosInstance;
