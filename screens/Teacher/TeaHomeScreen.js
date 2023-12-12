import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Root/commstyles";

const TeaHomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Student Home Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Page1")}
            >
                <Text style={styles.buttonText}>I am a Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Page2")}
            >
                <Text style={styles.buttonText}>I am a Teacher</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TeaHomeScreen;
