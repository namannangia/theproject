import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    ImageBackground,
    Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../assets/commstyles";
import ExcelExport from "./ExcelExport";
import axios from "axios";
import { AuthService } from "../../Api/AuthService";
import Card from "./CardDetailed";
import {
    PaperProvider,
    Button,
    Surface,
    Provider,
    Portal,
    Modal,
} from "react-native-paper";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CommonCard from "./CommonCard";
import Wrapper from "../../assets/Wrapper";
const Classes = ({ navigation }) => {
    const [lectureArr, setlectureArr] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("Loading...");
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const route = useRoute();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const epochToDate = (epoch) => {
        const dateObject = new Date(epoch);
        const formattedDate = dateObject.toLocaleString("en-UK", {
            month: "short",
            dayPeriod: "long",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
        return formattedDate;
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };
    const fetchData = async () => {
        try {
            setRefreshing(true);
            setErrMsg("Loading...");
            setlectureArr([]);
            try {
                const res = await AuthService.getLectures(
                    route.params?.data._id || ""
                );
                if (res) {
                    if (res !== 404) setlectureArr(res);
                }
            } catch (error) {
                console.log("ClassesDetailed.fetchData() Error:", error);
            }
        } finally {
            setRefreshing(false);
            setErrMsg("No lectures found. Please create one.");
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Wrapper refreshing={refreshing} fetchData={fetchData}>
            <SafeAreaView
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: 25,
                }}
            >
                <Portal>
                    <Modal
                        dismissable={false}
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={{
                            backgroundColor: "white",
                            // paddingVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Montserrat-Bold",
                                fontSize: 22,
                                padding: 12,
                            }}
                        >
                            {`Create ${
                                route.params?.data.Class_title || "NoNameFound"
                            } Lecture`}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Montserrat-Medium",
                                // borderWidth: 2,
                                borderRadius: 200,
                                borderStyle: "dashed",
                                // borderColor: "rgba(0,0,0,0.2)",
                                textAlign: "center",
                                fontSize: 24,
                                marginHorizontal: 45,
                            }}
                        >
                            {epochToDate(date)}
                        </Text>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={false}
                                onChange={onChange}
                            />
                        )}

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                mode="text"
                                style={{ margin: 16 }}
                                onPress={showDatepicker}
                            >
                                Change Date
                            </Button>

                            <Button
                                mode="text"
                                style={{ margin: 16 }}
                                onPress={showTimepicker}
                            >
                                Change Time
                            </Button>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                margin: 20,
                            }}
                        >
                            <Button
                                style={{
                                    width: 120,
                                    alignSelf: "center",
                                }}
                                icon="plus"
                                mode="contained"
                                buttonColor="#3D3DB6"
                                onPress={async () => {
                                    try {
                                        const res =
                                            await AuthService.createLecture(
                                                route.params?.data.Class_code,
                                                date
                                            );
                                        if (res) {
                                            alert(
                                                "Lecture Added Successfully for" +
                                                    epochToDate(date)
                                            );
                                            fetchData();
                                            setDate(new Date());
                                            hideModal();
                                        } else alert("Nores");
                                    } catch (error) {
                                        alert(error);
                                    }
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                style={{
                                    width: 120,
                                    alignSelf: "center",
                                }}
                                icon="cancel"
                                mode="outlined"
                                onPress={() => {
                                    hideModal();
                                }}
                            >
                                Cancel
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <View style={{ display: "flex", flex: 1 }}>
                    <Text
                        style={{
                            fontSize: Platform.OS === "ios" ? 22 : 20,
                            fontFamily: "Montserrat-Bold",
                            textAlignVertical: "center",
                            textAlign: "center",
                            color: "#303090",
                            padding: 20,
                        }}
                    >
                        {route.params?.data.Class_title.toString().toUpperCase() ||
                            "NoNameFound"}{" "}
                    </Text>
                </View>

                <View style={{ display: "flex", flex: 1 }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            // padding: 12,
                        }}
                    >
                        <Button
                            onPress={() => {
                                ExcelExport({ a: "b" });
                            }}
                            style={{
                                marginBottom: 20,
                                marginRight: 20,
                            }}
                            icon={"download"}
                            mode="elevated"
                            buttonColor="#F5F7F8"
                            textColor="#3D3DB6"
                        >
                            Download
                        </Button>

                        <Button
                            onPress={() => showModal()}
                            style={{
                                marginBottom: 20,
                            }}
                            icon={"plus"}
                            mode="contained"
                        >
                            Add Lecture
                        </Button>
                    </View>
                </View>
                <ScrollView
                    style={{
                        minHeight: screenHeight * 0.7,
                        overflow: "scroll",
                    }}
                >
                    {lectureArr.length > 0 ? (
                        lectureArr.map((a, b) => {
                            return (
                                <CommonCard
                                    key={b}
                                    heading={epochToDate(a.data.date)}
                                    hasProgressBar={true}
                                    progressBarValues={[
                                        a.data.Presentees.length,
                                        route.params?.data.totalStudents.length,
                                    ]}
                                    progressBarPerc={
                                        route.params?.data.totalStudents
                                            .length === 0
                                            ? 0
                                            : a.data.Presentees.length /
                                              route.params?.data.totalStudents
                                                  .length
                                    }
                                    onclick={() => {
                                        route.params?.data.totalStudents
                                            .length === 0
                                            ? alert(
                                                  "No students in " +
                                                      route.params?.data.Class_title.toString().toUpperCase() +
                                                      ". Please invite using: '" +
                                                      route.params?.data
                                                          .Class_code +
                                                      "'"
                                              )
                                            : navigation.navigate(
                                                  "Student Detail",
                                                  {
                                                      data: lectureArr[b],
                                                  }
                                              );
                                    }}
                                />
                            );
                        })
                    ) : (
                        <Text
                            style={{
                                fontFamily: "Montserrat-Italic",
                            }}
                        >
                            {errMsg}
                        </Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </Wrapper>
    );
};

export default Classes;
