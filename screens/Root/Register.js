import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import styles from "../../assets/commstyles";
import { AuthService } from "../../Api/AuthService";
import Svg, { Image } from "react-native-svg";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";

const Register = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [name, setname] = React.useState("");
    const [empcode, setEmpcode] = React.useState("");
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [loading, setLoading] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    return (
        <PaperProvider>
            <SafeAreaView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView>
                        <View
                            style={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
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
                                College Register
                            </Text>
                            <View
                                style={{
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
                                            fontSize: 30,
                                            textAlign: "center",
                                        }}
                                    >
                                        Teacher
                                    </Text>
                                    <RadioButton.Android
                                        value="first"
                                        status={
                                            checked ? "checked" : "unchecked"
                                        }
                                        onPress={() => setChecked(true)}
                                    />
                                </View>

                                <Text>{"          "}</Text>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            textAlign: "center",
                                        }}
                                    >
                                        Student
                                    </Text>
                                    <RadioButton.Android
                                        value="second"
                                        status={
                                            !checked ? "checked" : "unchecked"
                                        }
                                        onPress={() => setChecked(false)}
                                    />
                                </View>
                            </View>
                            <View style={{ width: 300 }}>
                                <View>
                                    <TextInput
                                        style={{
                                            maxHeight: 60,
                                            fontSize: 20,
                                            marginBottom: 20,
                                        }}
                                        value={name}
                                        onChangeText={(text) => {
                                            setname(text);
                                        }}
                                        mode="outlined"
                                        label="Name"
                                    />
                                    <TextInput
                                        style={{
                                            maxHeight: 60,
                                            fontSize: 20,
                                        }}
                                        value={email}
                                        onChangeText={(text) => {
                                            setEmail(text);
                                        }}
                                        mode="outlined"
                                        label="Email"
                                        right={
                                            <TextInput.Affix text="@msijanakpuri.com" />
                                        }
                                    />
                                    <TextInput
                                        style={{
                                            maxHeight: 60,
                                            fontSize: 20,
                                            marginVertical: 20,
                                        }}
                                        mode="outlined"
                                        value={password}
                                        onChangeText={(text) =>
                                            setPassword(text)
                                        }
                                        label="Password"
                                        secureTextEntry={!passwordVisible}
                                        right={
                                            <TextInput.Icon
                                                icon={
                                                    passwordVisible
                                                        ? "eye-off"
                                                        : "eye"
                                                }
                                                onPress={
                                                    togglePasswordVisibility
                                                }
                                            />
                                        }
                                    />
                                    <TextInput
                                        clearTextOnFocus={true}
                                        style={{
                                            maxHeight: 60,
                                            fontSize: 20,
                                        }}
                                        value={empcode}
                                        onChangeText={(text) => {
                                            setEmpcode(text);
                                        }}
                                        mode="outlined"
                                        label={
                                            checked
                                                ? "Employee Code"
                                                : "Enrollment Number"
                                        }
                                    />
                                </View>
                            </View>

                            <Button
                                mode="contained"
                                icon={"check"}
                                disabled={loading}
                                style={{ margin: 20 }}
                                onPress={async () => {
                                    setLoading(true);
                                    const isStudent = !checked;
                                    try {
                                        const res = await AuthService.register(
                                            name,
                                            email + "@msijanakpuri.com",
                                            password,
                                            empcode,
                                            isStudent
                                        );
                                        if (res)
                                            if (res === true) {
                                                try {
                                                    const obj =
                                                        await AuthService.login(
                                                            email +
                                                                "@msijanakpuri.com",
                                                            password,
                                                            isStudent
                                                        );
                                                    if (obj)
                                                        if (obj.EnrNum) {
                                                            console.log(
                                                                "Navigating to:STUDENT"
                                                            );
                                                            navigation.navigate(
                                                                "StudentStackScreens"
                                                            );
                                                        } else {
                                                            console.log(
                                                                "Navigating to:TEACHER"
                                                            );
                                                            navigation.navigate(
                                                                "TeacherStackScreens"
                                                            );
                                                        }
                                                    // navigation.navigate("StudentPage1");
                                                    else
                                                        alert(
                                                            "Invalid Credentials"
                                                        );
                                                } catch (error) {}
                                            } else console.log("!res");
                                        setLoading(false);
                                    } catch (error) {
                                        console.log("Register err:", error);
                                        setLoading(false);
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </PaperProvider>
    );
};

export default Register;
