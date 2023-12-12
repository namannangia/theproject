import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import styles from "../Root/commstyles";
import { AuthService } from "../../AuthService";

const Card = ({ a, navigation }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                margin: 10,
                width: 300,
                borderRadius: 20,
            }}
        >
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
                {a.Class_title}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 300 }}>
                {a.Class_description}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 500 }}>
                Strength:{a.totalStudents.length}
            </Text>
        </TouchableOpacity>
    );
};

export default Card;
