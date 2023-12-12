import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./commstyles";

const RootPage1Screen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RootPage1Screen;
