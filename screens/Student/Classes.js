import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar,
    ImageBackground,
} from "react-native";
import styles from "../../assets/commstyles";
import axios from "axios";
import { AuthService } from "../../Api/AuthService";

import {
    Button,
    Modal,
    PaperProvider,
    Portal,
    ProgressBar,
    Provider,
    TextInput,
} from "react-native-paper";

import Card from "./Card";
import { RefreshControl } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Api } from "../../Api/Api";
import Wrapper from "../../assets/Wrapper";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const Classes = ({ route, navigation }) => {
    const screenWidth = Dimensions.get("window").width;
    const [attendanceRec, setAttendanceRec] = React.useState();
    const [totalClasses, setTotalClasses] = React.useState(0);
    const [totalPresent, setTotalPresent] = React.useState(0);
    const [uname, setUname] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("Loading...");

    React.useEffect(() => {
        if (attendanceRec)
            if (attendanceRec.class.length === 0)
                setErrMsg("No classes joined. Please join one.");
    }, [attendanceRec]);
    const [refreshing, setRefreshing] = React.useState(false);
    const fetchData = async () => {
        try {
            setRefreshing(true);
            setErrMsg("Loading...");
            setAttendanceRec();
            const userData = await AuthService.getUserName();
            if (userData) {
                console.log("usrdata,classes", userData);
                setUname(userData.Name.toUpperCase());
                try {
                    const res = await Api.post(
                        "/student/getAttendance/" + userData._id
                    );
                    if (res) {
                        setAttendanceRec(res.payload);
                    }
                } catch (error) {
                    console.log(
                        "Error at Student>Classes>checkLoginState()",
                        error
                    );
                }
            } else {
                console.log("User data not found, navigating to HOME");
                navigation.navigate("Home");
            }
        } catch (error) {
            console.error("Error1 checking login state:", error);
        } finally {
            setRefreshing(false);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    const [visible, setVisible] = React.useState(false);
    const [classCode, setClassCode] = React.useState("");
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "white", padding: 20 };
    return (
        <Wrapper refreshing={refreshing} fetchData={fetchData}>
            <SafeAreaView
                style={[styles.container, { backgroundColor: "transparent" }]}
            >
                <Portal>
                    <Modal
                        dismissable={false}
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={containerStyle}
                    >
                        <TextInput
                            style={{
                                maxHeight: 60,
                                fontSize: 20,
                                marginTop: 20,
                            }}
                            clearTextOnFocus={false}
                            mode="outlined"
                            value={classCode}
                            onChangeText={(text) => setClassCode(text)}
                            label="Class Code"
                        />
                        <Button
                            style={{ margin: 20 }}
                            // icon="plus"
                            mode="contained"
                            buttonColor="#3D3DB6"
                            onPress={async () => {
                                console.log("Joining class :", classCode);
                                try {
                                    const stuid =
                                        await AuthService.getUserName();

                                    const res = await AuthService.joinClass(
                                        classCode,
                                        stuid._id
                                    );
                                    if (res) {
                                        if (res.status === 200) {
                                            fetchData();
                                            hideModal();
                                        } else {
                                            alert("Class not found!");
                                            hideModal();
                                        }
                                    }
                                } catch (error) {}
                            }}
                        >
                            Join
                        </Button>
                        <Button
                            style={{ margin: 20 }}
                            icon="cancel"
                            mode="outlined"
                            textColor="#3D3DB6"
                            onPress={hideModal}
                        >
                            Cancel
                        </Button>
                    </Modal>
                </Portal>
                <Text
                    style={{
                        marginTop: Platform.OS === "ios" ? 40 : 60,
                        fontSize: Platform.OS === "ios" ? 25 : 20,
                        fontFamily: "Montserrat-Bold",
                    }}
                >
                    Welcome, {uname}
                </Text>
                <Button
                    style={{ margin: 20 }}
                    icon="plus"
                    mode="contained"
                    buttonColor="#3D3DB6"
                    onPress={() => showModal()}
                >
                    Join Class
                </Button>
                <View
                    style={[
                        styles.container,
                        { backgroundColor: "transparent" },
                    ]}
                >
                    {attendanceRec && attendanceRec.class.length > 0 ? (
                        <ScrollView
                            style={{
                                flex: 1,
                                display: "flex",
                                alignSelf: "center",
                            }}
                        >
                            {attendanceRec.class.map((a, b) => {
                                return (
                                    <Card
                                        attendanceRec={attendanceRec}
                                        b={b}
                                        a={a}
                                        key={b + 1}
                                    />
                                );
                            })}
                        </ScrollView>
                    ) : (
                        <Text
                            style={{
                                fontStyle: "italic",
                                fontSize: 20,
                                color: "white",
                            }}
                        >
                            {errMsg}
                        </Text>
                    )}
                </View>
                {totalClasses !== 0 && totalPresent !== 0 ? (
                    <TouchableOpacity
                        style={{
                            backgroundColor: "rgba(0,0,100,0.1)",
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            margin: 20,
                            maxHeight: 540,
                            width: 300,
                            borderRadius: 20,
                            display: "flex",
                            borderWidth: 1,
                            borderColor: "rgba(0,0,100,0.4)",
                        }}
                    >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    flex: 2,
                                    fontSize: Platform.OS === "ios" ? 20 : 16,
                                    fontFamily: "Montserrat-Light",
                                    verticalAlign: "middle",
                                }}
                            >
                                {`Overall`}
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: 20,
                                    fontFamily: "Montserrat-Light",
                                }}
                            >{`${((totalPresent / totalClasses) * 100).toFixed(
                                1
                            )}%`}</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </SafeAreaView>
        </Wrapper>
    );
};

export default Classes;
