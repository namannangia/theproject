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
import { TextInputIcon } from "react-native-paper";

const CommonCard = ({
    heading,
    subheading,
    description,
    hasProgressBar,
    progressBarPerc,
    progressBarValues,
    onclick,
    idx,
}) => {
    return (
        <TouchableOpacity onPress={onclick} style={styles.cardContainer}>
            <View style={styles.contentContainer}>
                {heading ? (
                    <Text style={styles.titleText}>
                        {idx ? idx + ") " : ""}
                        {heading}
                    </Text>
                ) : (
                    <></>
                )}
                {subheading ? (
                    <Text style={styles.normalText}>{subheading}</Text>
                ) : (
                    <></>
                )}
                {description ? (
                    <Text style={styles.normalText}>{description}</Text>
                ) : (
                    <></>
                )}
                {hasProgressBar ? (
                    <View>
                        {progressBarValues ? (
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={styles.normalText}>
                                    {`${(progressBarPerc * 100).toFixed(1)}%`}
                                </Text>
                                <Text style={styles.normalText}>
                                    {" "}
                                    <Text>{progressBarValues[0]} </Text>/{" "}
                                    <Text>{progressBarValues[1]} </Text>
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                        <ProgressBar
                            progress={progressBarPerc}
                            style={styles.progressBar}
                            color={"#3D3DB6"}
                        />
                    </View>
                ) : (
                    <></>
                )}
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
        overflow: "hidden",
        position: "relative",
        backgroundColor: "rgba(48,48,146,0.2)",
        borderWidth: 2,
        borderColor: "rgba(48,48,146,0.5)",
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
        fontSize: 14,
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

export default CommonCard;
