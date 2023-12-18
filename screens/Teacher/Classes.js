import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    RefreshControl,
    ImageBackground,
    Dimensions,
    StatusBar,
} from "react-native";
import styles from "../../assets/commstyles";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import axios from "axios";
import { AuthService } from "../../Api/AuthService";
import Card from "./Card";
import { Button, Modal, Portal, Provider, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import commstyles from "../../assets/commstyles";
import { BlurView } from "react-native-blur";
import CommonCard from "./CommonCard";
import Wrapper from "../../assets/Wrapper";
const ClassesDetailed = ({ navigation }) => {
    const [classArr, setClassArr] = React.useState([]);
    const [uname, setuname] = React.useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const [errMsg, setErrMsg] = useState("Loading...");
    const [visible, setVisible] = React.useState(false);
    const [classCode, setClassCode] = React.useState("");
    const [classTitle, setclassTitle] = React.useState("");
    const [classDesc, setclassDesc] = React.useState("");
    const showModal = () => setVisible(true);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const hideModal = () => setVisible(false);

    const fetchData = async () => {
        try {
            setRefreshing(true);
            setErrMsg("Loading...");
            setClassArr([]);
            AuthService.getUserName().then(async (data) => {
                console.log("classes data", data);
                if (data) {
                    setuname(data);
                }

                try {
                    const classes = await AuthService.getClasses(data.Emp_Code);
                    if (classes) {
                        setErrMsg("No classes found. Please create one.");
                        setClassArr(classes);
                    } else setErrMsg("No Classes Found. Please create one.");
                } catch (error) {}
            });
        } finally {
            setRefreshing(false);
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
                <Text
                    style={{
                        marginTop: Platform.OS === "ios" ? 20 : 30,
                        fontSize: Platform.OS === "ios" ? 25 : 20,
                        marginBottom: 20,
                        fontFamily: "Montserrat-Bold",
                        color: "#303090",
                    }}
                >
                    Welcome, {uname?.Name || ""}
                </Text>
                <Portal>
                    <Modal
                        dismissable={false}
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={{
                            backgroundColor: "white",
                            padding: 20,
                        }}
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
                            label="Paper Code"
                        />
                        <TextInput
                            style={{
                                maxHeight: 60,
                                fontSize: 20,
                                marginTop: 20,
                            }}
                            clearTextOnFocus={false}
                            mode="outlined"
                            value={classTitle}
                            onChangeText={(text) => setclassTitle(text)}
                            label="Class Title"
                        />
                        <TextInput
                            style={{
                                maxHeight: 60,
                                fontSize: 20,
                                marginTop: 20,
                            }}
                            clearTextOnFocus={false}
                            mode="outlined"
                            value={classDesc}
                            onChangeText={(text) => setclassDesc(text)}
                            label="Class Description"
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Button
                                style={{ margin: 20 }}
                                icon="plus"
                                mode="contained"
                                buttonColor="#3D3DB6"
                                onPress={async () => {
                                    console.log("Creating class :", classCode);
                                    try {
                                        const res =
                                            await AuthService.createClass(
                                                classCode,
                                                classTitle,
                                                classDesc,
                                                uname._id
                                            );
                                        if (res?.status === 200)
                                            alert(
                                                "Class created successfully. Please invite students at: '" +
                                                    classCode +
                                                    "'"
                                            );
                                        else
                                            alert(
                                                "Could not create class. Try again later."
                                            );
                                        hideModal();
                                        fetchData();
                                    } catch (error) {}
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                style={{ margin: 20 }}
                                icon="cancel"
                                mode="outlined"
                                // buttonColor="#3D3DB6"
                                onPress={() => {
                                    setClassCode("");
                                    setclassDesc("");
                                    setclassTitle("");
                                    hideModal();
                                }}
                            >
                                Cancel
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <Button
                    onPress={() => {
                        showModal();
                    }}
                    buttonColor="#303090"
                    icon={"plus"}
                    mode="contained"
                >
                    Add Class
                </Button>
                <ScrollView style={{ marginTop: 20 }}>
                    {classArr.length > 0 ? (
                        <View>
                            {classArr.map((a, b) => {
                                return (
                                    <CommonCard
                                        heading={a.Class_title}
                                        subheading={a.Class_description}
                                        description={
                                            "Strength: " +
                                            a.totalStudents.length
                                        }
                                        idx={b + 1}
                                        key={b + 1}
                                        onclick={() => {
                                            navigation.navigate(
                                                "Class Detail",
                                                { data: classArr[b] }
                                            );
                                        }}
                                    />
                                );
                            })}
                        </View>
                    ) : (
                        <Text style={{ fontStyle: "italic" }}>{errMsg}</Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        </Wrapper>
    );
};

export default ClassesDetailed;
