import React from "react";
import { AuthService } from "../../Api/AuthService";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Reports from "./Reports";
import Classes from "./Classes";
import Profile from "./Profile";
import { CommonActions } from "@react-navigation/native";
import { Button, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Image, Svg } from "react-native-svg";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const ClassesStack = createStackNavigator();
const ReportsStack = createStackNavigator();

const ProfileStackScreens = ({ route }) => (
    <ProfileStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName="ProfilePage"
    >
        <ProfileStack.Screen
            options={{ headerShown: false }}
            name="ProfilePage"
            initialParams={{ uname: uname.Name }}
            component={Profile}
        />
    </ProfileStack.Navigator>
);

const ClassesStackScreens = ({ route }) => (
    <ClassesStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName="ClassesPage"
    >
        <ClassesStack.Screen
            options={{ headerShown: false }}
            name="ClassesPage"
            initialParams={{ uname: uname.Name }}
            component={Classes}
        />
    </ClassesStack.Navigator>
);
const ReportsStackScreens = () => (
    <ReportsStack.Navigator initialRouteName="ReportsPage">
        <ReportsStack.Screen
            options={{ headerShown: false }}
            name="ReportsPage"
            component={Reports}
        />
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
        screenOptions={{
            headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
                navigationState={state}
                // safeAreaInsets={insets}
                onTabPress={({ route, preventDefault }) => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (event.defaultPrevented) {
                        preventDefault();
                    } else {
                        navigation.dispatch({
                            ...CommonActions.navigate(route.name, route.params),
                            target: state.key,
                        });
                    }
                }}
                style={{
                    backgroundColor: "rgb(48,48,142)",
                }}
                activeColor="#aaa"
                inactiveColor="#fff"
                renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                        return options.tabBarIcon({
                            focused,
                            color,
                            size: 24,
                        });
                    }

                    return null;
                }}
                getLabelText={({ route }) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.title;

                    return label;
                }}
            />
        )}
    >
        <Tab.Screen
            name="Classes"
            component={ClassesStackScreens}
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="home" size={size} color={color} />;
                },
            }}
        />
        <Tab.Screen
            name="Reports"
            component={ReportsStackScreens}
            options={{
                tabBarLabel: "Schedule",
                tabBarIcon: ({ color, size }) => {
                    return <Icon name="calendar" size={size} color={color} />;
                },
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreens}
            options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Icon name="account-circle" size={size} color={color} />
                    );
                },
            }}
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
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default StuPage1;
