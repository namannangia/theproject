import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthService = {
    login: async (username, password, z) => {
        try {
            const response = await fetch(
                `https://3fdj0rzk-3001.inc1.devtunnels.ms/${
                    z === 1 ? "tea" : "stu"
                }login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                    }),
                }
            );

            if (!response.ok) {
                // Handle non-successful HTTP responses
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.id !== "") {
                console.log("Sending", data.id);
                try {
                    await AsyncStorage.setItem("userId", JSON.stringify(data));
                } catch (error) {
                    console.error("Error storing user ID:", error);
                }
                return data.id;
            } else {
                return "";
            }
        } catch (error) {
            console.error("Error at login :", error);
            throw error; // Rethrow the error for the caller to handle if needed
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("userId");
    },

    getUserName: async () => {
        try {
            const userData = await AsyncStorage.getItem("userId");
            if (userData) {
                console.log("auth.userdata:", userData);
                return JSON.parse(userData);
            } else console.log("LocalStorage['userId'] not found");
        } catch (error) {
            return error;
        }
    },
};
