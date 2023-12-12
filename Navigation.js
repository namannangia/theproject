import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Root/HomeScreen";
import StuHomeScreen from "./screens/Student/StuHomeScreen";
import StuPage1 from "./screens/Student/StuPage1";
import TeaHomeScreen from "./screens/Teacher/TeaHomeScreen";
import StuLoginScreen from "./screens/Student/StuLoginScreen";
import TeaLoginScreen from "./screens/Teacher/TeaLoginScreen";
import TeaPage1 from "./screens/Teacher/TeaPage1";
const Stack = createStackNavigator();
const StudentStack = createStackNavigator();
const TeacherStack = createStackNavigator();

const StudentStackScreens = () => (
    <StudentStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="StudentHome"
    >
        <StudentStack.Screen name="StudentHome" component={StuHomeScreen} />
        <StudentStack.Screen name="StudentPage1" component={StuPage1} />
        <StudentStack.Screen
            name="StudentLoginPage"
            component={StuLoginScreen}
        />
    </StudentStack.Navigator>
);

const TeacherStackScreens = () => (
    <TeacherStack.Navigator screenOptions={{ headerShown: false }}>
        <TeacherStack.Screen name="TeacherHome" component={TeaHomeScreen} />
        <TeacherStack.Screen name="TeacherPage1" component={TeaPage1} />
        <TeacherStack.Screen
            name="TeacherLoginPage"
            component={TeaLoginScreen}
        />
    </TeacherStack.Navigator>
);

const Navigation = () => {
    // React.useEffect(async () => {
    //     const userdata = await AuthService.getUserData();
    //     if (userdata) {
    //         n1.navigate("StudentStackScreens", { screen: "StudentPage1" });
    //     }
    // }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Home"
            >
                <Stack.Screen
                    name="StudentStackScreens"
                    component={StudentStackScreens}
                />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="TeacherStackScreens"
                    component={TeacherStackScreens}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
