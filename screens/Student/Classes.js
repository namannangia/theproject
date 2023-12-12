import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import styles from "../Root/commstyles";
import axios from "axios";
import { AuthService } from "../../AuthService";

import * as Progress from "react-native-progress";
const Classes = ({ route, navigation }) => {
    const [attendanceRec, setAttendanceRec] = React.useState();
    React.useEffect(() => {
        const checkLoginState = async () => {
            try {
                const userData = await AuthService.getUserName();
                if (userData) {
                    console.log("usrdata,classes", userData);
                    axios
                        .post(
                            "https://3fdj0rzk-3001.inc1.devtunnels.ms/getAttendance/" +
                                userData._id
                        )
                        .then((res) => {
                            console.log(res.data);
                            setAttendanceRec(res.data.payload);
                        })
                        .catch((err) => {
                            console.log("AxiosErro at StuPage1.js: ", err);
                        });
                } else {
                    console.log("User data not found, navigating to HOME");
                    navigation.navigate("Home");
                }
            } catch (error) {
                console.error("Error1 checking login state:", error);
            }
        };

        checkLoginState();
    }, []);
    var abc = new Date();
    return (
        <SafeAreaView style={styles.container2}>
            <Text style={{ marginTop: 40, fontSize: 40, fontWeight: 100 }}>
                Welcome {route.params?.uname || ""}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 300 }}>
                {`${abc.toDateString()}`}
            </Text>
            <View style={styles.container}>
                {attendanceRec ? (
                    <ScrollView
                        style={{
                            flex: 1,
                            display: "flex",
                            alignSelf: "center",
                        }}
                    >
                        {attendanceRec.attendance.map((a, b) => {
                            return (
                                // <Text>
                                //     {attendanceRec.class[b]} ={" "}
                                //     {attendanceRec.attendance[b]} /{" "}
                                //     {attendanceRec.lectures[b]}{" "}
                                // </Text>
                                <View key={b + 1}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                            }}
                                        >{`${attendanceRec.class[b]}     ${(
                                            (attendanceRec.attendance[b] /
                                                attendanceRec.lectures[b]) *
                                            100
                                        ).toFixed(1)}% `}</Text>
                                    </View>

                                    <Progress.Bar
                                        width={300} // Set a fixed width or adjust as needed
                                        height={10}
                                        size={100}
                                        color="#909E68"
                                        style={{ padding: 1, marginBottom: 30 }}
                                        indeterminate={false}
                                        progress={
                                            attendanceRec.attendance[b] /
                                            attendanceRec.lectures[b]
                                        }
                                        showsText
                                        formatText={() =>
                                            `${Math.round(
                                                attendanceRec.attendance[b] *
                                                    100
                                            )}%`
                                        }
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                ) : (
                    <Text style={{ fontStyle: "italic" }}>Loading...</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Classes;
