import axios from "axios";
const backendURL = "https://3fdj0rzk-3000.inc1.devtunnels.ms";
export const Api = {
    get: async (url) => {
        try {
            const res = await axios.get(backendURL + url);
            if (res) {
                console.log("GET", url, res.data);
                return res.data;
            }
        } catch (error) {
            console.log("ERROR GET", url, error);
        }
    },

    post: async (url, data) => {
        try {
            const response = await axios.post(backendURL + url, data);
            console.log("POST", url, JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error("ERROR POST", url, error);
            throw error; // You might choose to handle or rethrow the error based on your needs
        }
    },
};
