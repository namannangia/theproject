import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Root/commstyles";
import { AuthService } from "../../AuthService";
import axios from "axios";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Reports from "./Reports";
import Classes from "./Classes";
import Profile from "./Profile";
import ClassLogo from "./ClassLogo";
import ProfileLogo from "./ProfileLogo";
import ReportLogo from "./ReportLogo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ClassesStack = createStackNavigator();
const ReportsStack = createStackNavigator();

const ProfileStackScreens = ({ route }) => (
    <ProfileStack.Navigator initialRouteName="ProfilePage">
        <ProfileStack.Screen
            options={{ headerShown: false }}
            name="ProfilePage"
            initialParams={{ uname: uname.Name }}
            component={Profile}
        />
        {/* Add more student screens as needed */}
    </ProfileStack.Navigator>
);

const ClassesStackScreens = ({ route }) => (
    <ClassesStack.Navigator initialRouteName="ClassesPage">
        <ClassesStack.Screen
            options={{ headerShown: false }}
            name="ClassesPage"
            initialParams={{ uname: uname.Name }}
            component={Classes}
        />
        {/* Add more student screens as needed */}
    </ClassesStack.Navigator>
);
const ReportsStackScreens = () => (
    <ReportsStack.Navigator initialRouteName="ReportsPage">
        <ReportsStack.Screen
            options={{ headerShown: false }}
            name="ReportsPage"
            component={Reports}
        />
        {/* Add more student screens as needed */}
    </ReportsStack.Navigator>
);
var uname = "";
const checkLoginState = async () => {
    try {
        const userData = await AuthService.getUserName();
        if (userData) {
            uname = userData;
        } else {
            console.log("User data not found, navigating to HOME");
            navigation.navigate("Home");
        }
    } catch (error) {
        console.log("Error checking login state:", error);
    }
};

const MainTabs = ({ route }) => (
    <Tab.Navigator
        initialRouteName="Classes"
        screenOptions={{
            tabBarStyle: { backgroundColor: "#B1C381" },
            tabBarActiveBackgroundColor: "#909E68",
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "black",
            tabBarHideOnKeyboard: true, // Hide the tab bar when the keyboard is open
            tabBarTransitionPreset: "fade",
        }}
    >
        <Tab.Screen
            options={{ headerShown: false, tabBarIcon: () => <ClassLogo /> }}
            name="Classes"
            component={ClassesStackScreens}
        />
        <Tab.Screen
            options={{ headerShown: false, tabBarIcon: (e) => <ProfileLogo /> }}
            name="Profile"
            component={ProfileStackScreens}
        />
        <Tab.Screen
            options={{ headerShown: false, tabBarIcon: (e) => <ReportLogo /> }}
            name="Reports"
            component={ReportsStackScreens}
        />
    </Tab.Navigator>
);
checkLoginState();
const StuPage1 = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }} // Hide the header of the Stack Navigator
            />
            {/* Add more top-level screens as needed */}
        </Stack.Navigator>
    );
};

export default StuPage1;
