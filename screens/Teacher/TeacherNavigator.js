import React from "react";
import { AuthService } from "../../Api/AuthService";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import Reports from "./Reports";
import Classes from "./Classes";
import Profile from "./Profile";
import ClassesDetailed from "./ClassesDetailed";
import LecturesDetailed from "./LecturesDetailed";
import StudentsDetailed from "./StudentsDetailed";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();
const ClassesStack = createStackNavigator();
const ReportsStack = createStackNavigator();

const ProfileStackScreens = ({ route }) => (
    <ProfileStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="ProfilePage"
    >
        <ProfileStack.Screen
            options={{ headerShown: false }}
            name="ProfilePage"
            initialParams={{
                uname: route.params?.uname || "",
            }}
            component={Profile}
        />
    </ProfileStack.Navigator>
);

const ClassesStackScreens = ({ route }) => (
    <ClassesStack.Navigator initialRouteName="ClassesPage">
        <ClassesStack.Screen
            options={{ headerShown: false }}
            name="ClassesPage"
            initialParams={{ uname: route.params?.uname || "bbb" }}
            component={Classes}
        />
        <ClassesStack.Screen
            options={{
                headerTintColor: "#3D3DB6",
                headerMode: "screen",
                headerBackTitle: " ",
            }}
            name="Class Detail"
            component={ClassesDetailed}
        />
        <ClassesStack.Screen
            options={{
                headerTintColor: "#3D3DB6",
                headerMode: "screen",
                headerBackTitle: " ",
            }}
            name="Lecture Detail"
            component={LecturesDetailed}
        />
        <ClassesStack.Screen
            options={{
                headerTintColor: "#3D3DB6",
                headerMode: "screen",
                headerBackTitle: " ",
            }}
            name="Student Detail"
            component={StudentsDetailed}
        />
    </ClassesStack.Navigator>
);
const ReportsStackScreens = () => (
    <ReportsStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="ReportsPage"
    >
        <ReportsStack.Screen
            options={{ headerShown: false }}
            name="ReportsPage"
            component={Reports}
        />
    </ReportsStack.Navigator>
);
const MainTabs = ({ route }) => (
    <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
                navigationState={state}
                safeAreaInsets={insets}
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
                    backgroundColor: "rgb(48,48,147)",
                }}
                activeColor="#262672"
                inactiveColor="#fff"
                renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                        return options.tabBarIcon({
                            focused,
                            color,
                            size: 30,
                        });
                    }

                    return null;
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
var uname = "";
const checkLoginState = async () => {
    try {
        const userData = await AuthService.getUserName();
        if (userData) {
            uname = userData;
            console.log("Done:", userData);
        } else {
            console.log("User data not found, navigating to HOME");
            navigation.navigate("Home");
        }
    } catch (error) {
        console.log("Error checking login state:", error);
    }
};
const TeaPage1 = ({ navigation }) => {
    const [uname, setuname] = React.useState("");
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                initialParams={{ data: uname }}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default TeaPage1;
