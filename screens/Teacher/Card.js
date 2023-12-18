import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";

const Card = ({ a, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                a.totalStudents.length > 0
                    ? navigation.navigate("Class Detail", {
                          classid: a._id,
                          classname: a.Class_title,
                          classcode: a.Class_code,
                          totalstuds: a.totalStudents,
                      })
                    : alert(
                          "No students in " +
                              a.Class_title +
                              ". Please ask students to join at: " +
                              a.Class_code
                      );
            }}
            style={styles.cardContainer}
        >
            <BlurView
                style={styles.blurContainer}
                blurReductionFactor={4}
                intensity={40} // Adjust the intensity of the blur (0 to 100)
                tint="dark" // Use "light" or "dark" for the tint
            />
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>Class - {a.Class_title}</Text>
                <Text style={styles.normalText}>
                    Info - {a.Class_description}
                </Text>
                <Text style={styles.normalText}>
                    Class Strength:{" "}
                    <Text style={styles.normalText}>
                        {a.totalStudents.length}
                    </Text>
                </Text>
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
