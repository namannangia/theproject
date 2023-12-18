import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ name, b, stuid, totalStrength }) => {
    const screenWidth = Dimensions.get("window").width;
    const [present, setPresent] = React.useState(false);
    React.useEffect(() => {
        for (x of totalStrength) {
            if (x.$oid === stuid) setPresent(true);
        }
        console.log(totalStrength);
    }, []);
    return (
        <TouchableOpacity
            style={{
                backgroundColor: present
                    ? "rgba(0,100,0,0.1)"
                    : "rgba(255,0,0,0.1)",
                paddingHorizontal: 20,
                paddingVertical: 10,
                margin: 10,
                width: screenWidth * 0.85,
                borderRadius: 20,
                display: "flex",
                borderWidth: 1,
                borderColor: "rgba(0,0,100,0.4)",
            }}
            onPress={() => {
                setPresent((e) => !e);
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        flex: 2,
                        fontSize: Platform.OS === "ios" ? 18 : 14,
                        fontFamily: "Montserrat-Italic",
                        color: "#3D3DB6",
                    }}
                >
                    {name.Name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Card;
