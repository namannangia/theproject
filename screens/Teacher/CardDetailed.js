import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from "react-native";
import { Icon, ProgressBar, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Card = ({
    a,
    b,
    date,
    percentage,
    presentees,
    totalstuds,
    lectureid,
    classid,
    classname,
}) => {
    const navigation = useNavigation();

    const epochToDate = (epoch) => {
        const dateObject = new Date(epoch);
        const formattedDate = dateObject.toLocaleString("en-US", {
            month: "short",
            dayPeriod: "long",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
        return formattedDate;
    };
    React.useEffect(() => {
        console.log("Loaded", lectureid, b);
    }, []);

    return (
        <TouchableOpacity
            onPress={() => {
                const lectureDate = epochToDate(date);
                navigation.navigate("Lecture Detail", {
                    lectureid: lectureid,
                    classname: classname,
                    lecturedate: lectureDate,
                    classid: classid,
                });
            }}
            style={styles.cardContainer}
        >
            {/* <BlurView
                style={styles.blurContainer}
                blurReductionFactor={4}
                intensity={50} // Adjust the intensity of the blur (0 to 100)
                tint="dark" // Use "light" or "dark" for the tint
            /> */}
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>
                    {b + 1 + ") "}
                    {epochToDate(date)}
                </Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.normalText}>
                        {`${(percentage * 100).toFixed(1)}%`}
                    </Text>
                    <Text style={styles.normalText}>
                        {" "}
                        <Text>{presentees ? presentees : 0} </Text>/{" "}
                        <Text>{totalstuds} </Text>
                    </Text>
                </View>
                <ProgressBar
                    progress={percentage}
                    style={styles.progressBar}
                    color={"#3D3DB6"}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
        height: 10,
        borderRadius: 400,
        marginVertical: 10,
        backgroundColor: "white",
    },
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
        fontSize: 18,
        color: "white",
        fontFamily: "Montserrat-Bold",
    },
    normalText: {
        fontSize: 12,
        color: "white",
        fontFamily: "Montserrat-Medium",
        paddingTop: 2,
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20, // Adjust the borderRadius as needed
        overflow: "hidden",
        zIndex: 1, // Ensure the BlurView is rendered on top
    },
});

export default Card;
