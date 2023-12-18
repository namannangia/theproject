import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import styles from "../../assets/commstyles";
import { AuthService } from "../../Api/AuthService";
import Wrapper from "../../assets/Wrapper";
import { useRoute } from "@react-navigation/native";
import { Button, Switch, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
const BasicCard = ({
    heading,
    idx,
    b,
    finalArr,
    isSwitchOn,
    presentees,
    setPresentees,
    total,
}) => {
    const route = useRoute();
    const [highlight, setHighlight] = React.useState(false);
    React.useEffect(() => {
        console.log("Total:", total);
        console.log("FinalArr[b]._id:", finalArr[b]._id);
        console.log("switch:", isSwitchOn);
        if (total.includes(finalArr[b]._id) && !isSwitchOn) setHighlight(true);
        if (highlight && isSwitchOn) {
            // student should be in presentArr and Edit mode is ON
            if (!presentees.find((id) => id === finalArr[b]._id)) {
                // student not found in presentArr
                setPresentees((e) => [finalArr[b]._id, ...e]);
            }
        }
        if (!highlight && isSwitchOn) {
            setPresentees((e) => e.filter((id) => id !== finalArr[b]._id));
        }
    }, [highlight]);
    return (
        <TouchableOpacity
            onPress={() => {
                isSwitchOn ? setHighlight((e) => !e) : alert("Not allowed");
            }}
            style={{
                display: "flex",
                flex: 1,
                backgroundColor: highlight
                    ? "rgba(0,200,0,0.2)"
                    : "rgba(200,0,0,0.2)",
                borderWidth: 2,
                borderColor: highlight
                    ? "rgba(0,200,0,0.5)"
                    : "rgba(200,0,0,0.5)",
                borderRadius: 200,
                padding: 20,
                width: Dimensions.get("screen").width * 0.8,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                margin: 5,
            }}
        >
            <View style={styles.contentContainer}>
                <Text
                    style={{
                        fontFamily: "Montserrat-Italic",
                        fontSize: 18,
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    {heading}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const StudentsDetailed = ({ route, navigation }) => {
    const [studentArr, setstudentArr] = React.useState([]);
    const [finalArr, setFinalArr] = React.useState([]);
    const [errMsg, setErrMsg] = React.useState("Loading...");
    const [Loading, setLoading] = React.useState({
        state: false,
        text: "Save changes",
    });
    const [refreshing, setRefreshing] = React.useState(false);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    React.useEffect(() => {
        if (!isSwitchOn) setPresentees([]);
    }, [isSwitchOn]);
    const [presentees, setPresentees] = React.useState([]);
    React.useEffect(() => {
        if (studentArr.length > 0) setFinalArr(studentArr);
    }, [studentArr]);
    const fetchData = async () => {
        try {
            setRefreshing(true);
            setErrMsg("Loading...");
            setstudentArr([]);
            try {
                const res = await AuthService.getEnrolledStudents(
                    route.params?.data.data.class_code
                );
                if (res && res.payload) {
                    setstudentArr(res.payload);
                } else setErrMsg("No students found");
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
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: 10,
                        // padding: 4,
                        borderRadius: 200,
                    }}
                >
                    <Switch
                        value={isSwitchOn}
                        color="#303090"
                        onValueChange={onToggleSwitch}
                    />
                    <Text style={{ padding: 10 }}>
                        <TextInput.Icon
                            icon={!isSwitchOn ? "lock" : "lock-open-variant"}
                        />
                    </Text>
                    {isSwitchOn ? (
                        <Button
                            style={{ marginLeft: 30 }}
                            mode="contained"
                            disabled={Loading.state}
                            icon={"content-save-outline"}
                            onPress={async () => {
                                setLoading({ state: true, text: "Uploading" });
                                const res = await AuthService.markAttendance(
                                    presentees,
                                    route.params?.data.data._id
                                );
                                if (res.status === 200)
                                    alert("Attendance Updated!");
                                else console.log("nores");
                                setLoading({
                                    state: false,
                                    text: "Save Changes",
                                });
                            }}
                        >
                            {Loading.text}
                        </Button>
                    ) : (
                        <></>
                    )}
                </View>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <ScrollView
                        style={{
                            margin: 10,
                            maxHeight: Dimensions.get("screen").height * 0.7,
                        }}
                    >
                        {studentArr.length > 0 ? (
                            finalArr.map((a, b) => {
                                return (
                                    <BasicCard
                                        heading={a.Name}
                                        idx={b + 1}
                                        b={b}
                                        finalArr={finalArr}
                                        key={b + 1}
                                        isSwitchOn={isSwitchOn}
                                        presentees={presentees}
                                        setPresentees={setPresentees}
                                        total={
                                            route.params?.data.data.Presentees
                                        }
                                    />
                                );
                            })
                        ) : (
                            <Text
                                style={{
                                    fontFamily: "Montserrat-Italic",
                                    fontSize: 22,
                                    color: "#303090",
                                    textAlign: "center",
                                }}
                            >
                                {errMsg}
                            </Text>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Wrapper>
    );
};

export default StudentsDetailed;
