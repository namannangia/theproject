import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Pressable,
    Dimensions,
} from "react-native";
import styles from "../../assets/commstyles";
import { AuthService } from "../../Api/AuthService";
import Svg, { Image } from "react-native-svg";
import {
    Button,
    Provider as PaperProvider,
    RadioButton,
} from "react-native-paper";
import { TextInput } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
    const navig = useNavigation();
    const [email, setEmail] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const [isStudent, setStudent] = React.useState(true);
    const [password, setPassword] = React.useState("");
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    React.useEffect(() => {
        const checkLogin = async () => {
            const usrData = await AuthService.getUserName();
            if (usrData)
                if (usrData.EnrNum) {
                    navigation.navigate("StudentStackScreens", {
                        screen: "StudentPage1",
                    });
                } else {
                    navigation.navigate("TeacherStackScreens", {
                        screen: "TeacherPage1",
                    });
                }
        };
        checkLogin();
    }, []);
    return (
        <PaperProvider>
            <SafeAreaView
                style={{ display: "flex", flex: 1, alignItems: "center" }}
            >
                <View
                    style={{
                        borderWidth: 0,
                        borderRadius: 200,
                        padding: 10,
                    }}
                >
                    <Svg height="150" width="150">
                        <Image
                            href={require("../../assets/SurajmalLogo.png")}
                            width="100%"
                            height="100%"
                        />
                    </Svg>
                </View>
                <Text
                    style={{
                        fontSize: 37,
                        marginTop: 20,
                        marginBottom: 60,
                        fontFamily: "Montserrat-Light",
                    }}
                >
                    College Login
                </Text>

                <View style={{ width: 300 }}>
                    <View>
                        <TextInput
                            clearTextOnFocus={false}
                            style={{
                                maxHeight: 60,
                                fontSize: 20,
                                width: Dimensions.get("window").width * 0.9,
                                alignSelf: "center",
                            }}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                            mode="outlined"
                            label="Email"
                            right={<TextInput.Affix text="@msijanakpuri.com" />}
                        />
                        <TextInput
                            style={{
                                maxHeight: 60,
                                fontSize: 20,
                                marginTop: 20,
                                width: Dimensions.get("window").width * 0.9,
                                alignSelf: "center",
                            }}
                            clearTextOnFocus={false}
                            mode="outlined"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            label="Password"
                            secureTextEntry={!passwordVisible}
                            right={
                                <TextInput.Icon
                                    icon={passwordVisible ? "eye-off" : "eye"}
                                    onPress={togglePasswordVisibility}
                                />
                            }
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 30,
                        display: "flex",
                        flexDirection: "row",
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
                                fontSize: 20,
                                textAlign: "center",
                            }}
                        >
                            Teacher
                        </Text>
                        <RadioButton.Android
                            value="first"
                            status={isStudent ? "unchecked" : "checked"}
                            onPress={() => setStudent(false)}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 40,
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "center",
                            }}
                        >
                            Student
                        </Text>
                        <RadioButton.Android
                            value="second"
                            status={isStudent ? "checked" : "unchecked"}
                            onPress={() => setStudent(true)}
                        />
                    </View>
                </View>
                <Button
                    style={{ margin: 30 }}
                    mode="elevated"
                    icon={"key"}
                    onPress={async () => {
                        try {
                            const obj = await AuthService.login(
                                email + "@msijanakpuri.com",
                                password,
                                isStudent
                            );
                            if (obj)
                                if (obj.EnrNum) {
                                    console.log("Navigating to:STUDENT");
                                    navig.reset({
                                        index: 0,
                                        routes: [
                                            {
                                                name: "StudentStackScreens",
                                            },
                                        ],
                                        screen: "StudentPage1",
                                    });
                                } else {
                                    console.log("Navigating to:TEACHER");
                                    navig.reset({
                                        index: 0,
                                        routes: [
                                            {
                                                name: "TeacherStackScreens",
                                            },
                                        ],
                                        screen: "TeacherPage1",
                                    });
                                }
                            else alert("Invalid Credentials");
                        } catch (error) {
                            console.log("Error at stulogin:", error);
                        }
                    }}
                >
                    Login
                </Button>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                >
                    <Text>
                        New User?
                        <Text
                            style={{
                                color: "#3D3DB6",
                                fontFamily: "Montserrat-Light",
                            }}
                        >
                            {" "}
                            Register Now
                        </Text>
                    </Text>
                </Pressable>
            </SafeAreaView>
        </PaperProvider>
    );
};

export default HomeScreen;
