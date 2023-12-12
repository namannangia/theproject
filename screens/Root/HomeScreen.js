import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./commstyles";
import { AuthService } from "../../AuthService";
import { CommonActions } from "@react-navigation/native";
var usrData = "";
const checkLoginState = async (navigation) => {
    try {
        const userData = await AuthService.getUserName();
        if (userData) {
            console.log("yes", userData);
            if (userData.EnrNum) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: "StudentStackScreens",
                                params: { screen: "StudentPage1" },
                            },
                        ],
                    })
                );
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: "TeacherStackScreens",
                                params: { screen: "TeacherPage1" },
                            },
                        ],
                    })
                );
            }
        } else {
            console.log("No Login details found");
        }
    } catch (error) {
        console.log("Error checking login state:", error);
    }
};

const HomeScreen = ({ navigation }) => {
    React.useEffect(() => {
        checkLoginState(navigation);
    }, []);
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate("StudentStackScreens", {
                        screen: "StudentLoginPage",
                    })
                }
            >
                <Text style={styles.buttonText}>I am a Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate("TeacherStackScreens", {
                        screen: "TeacherLoginPage",
                    })
                }
            >
                <Text style={styles.buttonText}>I am a Teacher</Text>
            </TouchableOpacity>
            {usrData ? (
                <TouchableOpacity>
                    <Text>Log in as {usrData.Name}</Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}
        </View>
    );
};

export default HomeScreen;
