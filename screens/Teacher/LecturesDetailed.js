import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Platform,
    StatusBar,
    ImageBackground,
    Dimensions,
} from "react-native";
import ExcelExport from "./ExcelExport";
import AuthService from "../../Api/AuthService";
import Card from "./CardDetailed";
import { PaperProvider, Button, Provider } from "react-native-paper";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Wrapper from "../../assets/Wrapper";
const LecturesDetailed = ({ navigation }) => {
    const [studentsArr, setstudentsArr] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("Loading...");
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const route = useRoute();
    const fetchData = async () => {
        try {
            setRefreshing(true);
            setErrMsg("Loading...");
            setstudentsArr([]);
            try {
                const res = await AuthService.getUserName();
                if (res) console.log("RES:", res);
            } catch (error) {
                console.log("ClassesDetailed.fetchData() Error:", error);
            }
        } finally {
            setRefreshing(false);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <PaperProvider>
            <Wrapper refreshing={refreshing} fetchData={fetchData}>
                <SafeAreaView
                    style={[
                        styles.container,
                        {
                            backgroundColor: "transparent",
                        },
                    ]}
                >
                    <View>
                        <Text
                            style={{
                                marginTop: Platform.OS === "ios" ? 10 : 15,
                                fontSize: Platform.OS === "ios" ? 25 : 20,
                                fontFamily: "Montserrat-Bold",
                            }}
                        >
                            {route.params?.classname || "NoNameFound"}{" "}
                            {" Lecture "}
                        </Text>
                        <Text
                            style={{
                                marginTop: Platform.OS === "ios" ? 10 : 15,
                                fontSize: Platform.OS === "ios" ? 25 : 20,
                                fontFamily: "Montserrat-Light",
                            }}
                        >
                            {route.params?.lecturedate || "NoDateFound"}
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: 5,
                        }}
                    >
                        <Button
                            onPress={() => {
                                ExcelExport(xldata);
                            }}
                            style={{
                                marginBottom: 20,
                                marginRight: 20,
                                shadowOffset: { height: 0, width: 0 },
                                shadowOpacity: 0.8, // Set the opacity (0 to 1)
                                shadowRadius: 5,
                                shadowColor: "black",
                                elevation: 5,
                            }}
                            icon={"download"}
                            mode="elevated"
                            buttonColor="#F5F7F8"
                            textColor="#3D3DB6"
                        >
                            Download
                        </Button>
                        <Button
                            onPress={() => {
                                ExcelExport(xldata);
                            }}
                            style={{
                                marginBottom: 20,
                                marginRight: 20,
                                shadowOffset: { height: 0, width: 0 },
                                shadowOpacity: 0.8, // Set the opacity (0 to 1)
                                shadowRadius: 5,
                                shadowColor: "black",
                                elevation: 5,
                            }}
                            icon={"cassette"}
                            mode="contained"
                            buttonColor="#F5F7F8"
                            textColor="#3D3DB6"
                        >
                            Save
                        </Button>
                    </View>
                    <View
                        style={[
                            styles.container,
                            {
                                marginTop: 10,
                                backgroundColor: "transparent",
                            },
                        ]}
                    >
                        {studentsArr.length > 0 ? (
                            <ScrollView
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignSelf: "center",
                                }}
                            >
                                {data.totalStudents.map((a, b) => {
                                    return (
                                        <Card
                                            name={studentArr[a.$oid]}
                                            stuid={a.$oid}
                                            b={b}
                                            key={b + 1}
                                            totalStrength={
                                                lecturesmap[
                                                    route.params?.lectureid
                                                ].Presentees
                                            }
                                        />
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            <Text style={{ fontStyle: "italic" }}>
                                Loading...
                            </Text>
                        )}
                    </View>
                </SafeAreaView>
            </Wrapper>
        </PaperProvider>
    );
};

export default LecturesDetailed;
