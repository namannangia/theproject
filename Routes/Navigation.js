import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Root/HomeScreen";
import StuPage1 from "../screens/Student/StudentNavigator";
import TeaPage1 from "../screens/Teacher/TeacherNavigator";
import Register from "../screens/Root/Register";
const Stack = createStackNavigator();
const StudentStack = createStackNavigator();
const TeacherStack = createStackNavigator();

const StudentStackScreens = () => (
    <StudentStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="StudentPage1"
    >
        <StudentStack.Screen name="StudentPage1" component={StuPage1} />
    </StudentStack.Navigator>
);

const TeacherStackScreens = () => (
    <TeacherStack.Navigator
        initialRouteName="TeacherPage1"
        screenOptions={{ headerShown: false }}
    >
        <TeacherStack.Screen name="TeacherPage1" component={TeaPage1} />
    </TeacherStack.Navigator>
);

const Navigation = () => {
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
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                    name="TeacherStackScreens"
                    component={TeacherStackScreens}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
