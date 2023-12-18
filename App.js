import React from "react";
import { useFonts } from "expo-font";
import Navigation from "./Routes/Navigation.js";
import { View, Text } from "react-native";

const App = () => {
    const [fontsLoaded] = useFonts({
        "Montserrat-Light": require("./assets/Montserrat-Light.ttf"),
        "Montserrat-Bold": require("./assets/Montserrat-Bold.ttf"),
        "Montserrat-Italic": require("./assets/Montserrat-Italic.ttf"),
        "Montserrat-Medium": require("./assets/Montserrat-Medium.ttf"),
    });
    if (!fontsLoaded) {
        return (
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Loading Fonts...</Text>
            </View>
        );
    }
    return <Navigation />;
};

export default App;
