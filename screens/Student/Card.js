import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import {
    Button,
    Divider,
    MD3Colors,
    Modal,
    PaperProvider,
    Portal,
    ProgressBar,
    TextInput,
} from "react-native-paper";
const Card = ({ attendanceRec, b, navigation }) => {
    const class_name = attendanceRec.class[b];
    const screenWidth = Dimensions.get("window").width;
    const attendanceperc =
        attendanceRec.attendance[b] / attendanceRec.lectures[b];
    return (
        <TouchableOpacity style={styles.cardContainer}>
            <BlurView
                style={styles.blurContainer}
                blurReductionFactor={4}
                intensity={40} // Adjust the intensity of the blur (0 to 100)
                tint="dark" // Use "light" or "dark" for the tint
            />
            <View style={styles.contentContainer}>
                <Text
                    style={[
                        styles.titleText,
                        {
                            color: `${
                                attendanceRec.attendance[b] /
                                    attendanceRec.lectures[b] <
                                0.7
                                    ? "rgb(200,0,0)"
                                    : "white"
                            }`,
                        },
                    ]}
                >
                    {`${class_name}${attendanceperc < 0.7 ? "*" : ""}`}
                </Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.normalText}>
                        {`${(attendanceperc * 100).toFixed(1)}%`}
                    </Text>
                    <Text style={styles.normalText}>
                        {" "}
                        <Text>{attendanceRec.attendance[b]} </Text>/{" "}
                        <Text>{attendanceRec.lectures[b]} </Text>
                    </Text>
                </View>
                <ProgressBar
                    progress={attendanceperc ? attendanceperc : 0}
                    style={{
                        flex: 1,
                        height: 10,
                        borderRadius: 400,
                        marginVertical: 10,
                        backgroundColor: "white",
                    }}
                    color={"#3D3DB6"}
                />
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
        width: Dimensions.get("window").width * 0.8,
        borderRadius: 20,
        overflow: "hidden", // Ensure that the borderRadius works as expected
        position: "relative", // Added to establish a stacking context
    },
    contentContainer: {
        zIndex: 2,
        padding: 4,
        backgroundColor: "transparent", // Set the background color to make BlurView overlay work
    },
    titleText: {
        fontSize: 20,
        color: "white",
        fontFamily: "Montserrat-Light",
    },
    normalText: {
        fontSize: 14,
        color: "white",
        fontFamily: "Montserrat-Medium",
        paddingTop: 5,
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20, // Adjust the borderRadius as needed
        overflow: "hidden",
        zIndex: 1, // Ensure the BlurView is rendered on top
    },
});

export default Card;
