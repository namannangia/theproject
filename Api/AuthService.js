import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./Api";
export const AuthService = {
    login: async (username, password, isStudent) => {
        try {
            const response = await Api.post(
                `${isStudent ? "/student/login" : "/teacher/login"}`,
                {
                    email: username,
                    pass: password,
                }
            );

            // Check the condition based on your response structure
            if (response && response.status === 200) {
                console.log("Login successful. Response:", response);
                try {
                    const response2 = await Api.post("/verifyToken", response);

                    if (
                        response2 &&
                        response2.data &&
                        response2.data.userdata
                    ) {
                        console.log(
                            "Login successful. Response:",
                            response2.data.userdata
                        );
                        await AsyncStorage.setItem(
                            "userId",
                            JSON.stringify(response2.data.userdata)
                        );
                        return response2.data.userdata;
                    } else {
                        console.log(
                            "Login failed. Invalid response2.",
                            response2
                        );
                        return false;
                    }
                } catch (error) {
                    console.log("Error at AuthService login2", error);
                    return false;
                }
            } else {
                console.log("Login failed. Invalid response.", response);
                return false;
            }
        } catch (error) {
            console.log("Error at AuthService login", error);
            return false;
        }
    },

    getClasses: async (empCode) => {
        try {
            const resp = await Api.get("/teacher/getClasses/" + empCode);
            if (resp) return resp.payload;
            else console.log("classes not fethced");
        } catch (error) {
            console.log("Authservice.getclasses", error);
        }
    },
    getEnrolledStudents: async (class_code) => {
        try {
            const res = await Api.post("/teacher/getEnrolledStudents", {
                class_code: class_code,
            });
            if (res) return res;
        } catch (error) {
            console.log("AuthService.getEnrolledStudents ERROR:", error);
        }
    },
    getClassesStudent: async (empCode) => {
        try {
            const resp = await Api.get("/student/getClasses/" + empCode);
            if (resp) return resp.payload;
            else console.log("classes not fethced");
        } catch (error) {
            console.log("Authservice.getclasses", error);
        }
    },
    joinClass: async (classcode, studentid) => {
        try {
            const res = await Api.post("/student/joinClass", {
                classcode: classcode,
                stuid: studentid,
            });
            if (res) return res;
            else return false;
        } catch (error) {}
    },
    getLectures: async (uid) => {
        //uid: Class Object Id
        if (uid) {
            try {
                const resp = await Api.get("/teacher/getClassById/" + uid);
                if (resp) {
                    if (resp.data.lectures.length === 0) return 404;
                    else {
                        try {
                            payload = [];
                            for (x of resp.data.lectures) {
                                var res = await Api.get(
                                    "/teacher/getLectureById/" + x
                                );
                                if (res) payload.push(res);
                            }
                            return payload;
                        } catch (error) {
                            console.log(
                                "Authservice.getLectures (insider):",
                                error
                            );
                        }
                    }
                }
            } catch (error) {
                console.log("Authservice.getLectures", error);
            }
        }
    },

    register: async (name, email, password, empcode, isStudent) => {
        // 0 = Student, 1= Teacher
        var route = "";
        var data = {
            Name: name,
            email: email,
            pass: password,
        };
        if (isStudent) {
            data["EnrNum"] = empcode;
            route = "/student/signup";
        } else {
            data["Emp_Code"] = empcode;
            route = "/teacher/signup";
        }
        const res = await Api.post(route, data);
        if (res) {
            if (res.status !== 200)
                throw new Error(`HTTP error! Status: ${res.status}`);
            else return true;
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("userId");
    },

    getUserName: async () => {
        try {
            const userData = await AsyncStorage.getItem("userId");
            if (userData) {
                return JSON.parse(userData);
            } else console.log("LocalStorage['userId'] not found");
        } catch (error) {
            return error;
        }
    },
    markAttendance: async (presentees, lectureid) => {
        try {
            const res = await Api.post("/teacher/markPresent", {
                presentStudents: presentees,
                lectureID: lectureid,
            });
            if (res) {
                return res;
            } else console.log("Nores @markAttendance");
        } catch (error) {
            return error;
        }
    },
    getAttendanceRecord: async (uid) => {
        if (!uid || uid.length !== 24) return false;
        try {
            const res = await Api.post("/student/getAttendance/" + uid);
            if (res) {
                return res;
            } else return false;
        } catch (error) {
            console.log("AuthService.GetAttendance ERROR:", error);
        }
    },
    createClass: async (paperCode, classTitle, classDesc, createdBy) => {
        try {
            const res = await Api.post("/teacher/createClass", {
                paperCode,
                classDesc,
                classTitle,
                createdBy,
            });
            if (res) {
                return res;
            } else return false;
        } catch (error) {
            console.log("AuthService.createClass ERROR:", error);
        }
    },
    createLecture: async (paperCode, date) => {
        if (!paperCode || !date) return false;
        console.log("Sending", paperCode, date);
        try {
            const res = await Api.post("/teacher/createLecture", {
                Class_code: paperCode,
                date: date,
            });
            if (res) {
                return res;
            } else return false;
        } catch (error) {
            console.log("AuthService.createLecture ERROR:", error);
        }
    },
};
