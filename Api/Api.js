import axios from "axios";
const backendURL = "https://rr800rhg-3000.inc1.devtunnels.ms";
export const Api = {
  get: async (url) => {
    console.log("Sending Get @:", url);
    try {
      const res = await axios.get(backendURL + url);
      if (res) {
        console.log("GET", url, res.data);
        return res.data;
      }
    } catch (error) {
      console.log("ERROR GET", url, error, error.response?.data);
    }
  },

  post: async (url, data) => {
    console.log("Sending Post @:", url);
    try {
      const response = await axios.post(backendURL + url, data);
      console.log("POST", url, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(
        "ERROR POST",
        url,
        error,
        error.response,
        error?.response?.data
      );
      throw error;
    }
  },
};
