import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    Dimensions,
    ImageBackground,
} from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Provider } from "react-native-paper";

const Wrapper = ({ children, refreshing, fetchData }) => {
    return (
        <Provider>
            <ScrollView
                nestedScrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetchData}
                        colors={["#009688"]} // Customize the color of the loading spinner
                    />
                }
            >
                <StatusBar hidden />
                <LinearGradient
                    colors={["white", "#303090"]}
                    locations={[0, 1]}
                    style={{
                        height: Dimensions.get("screen").height,
                        width: Dimensions.get("screen").width,
                    }}
                >
                    <ImageBackground
                        style={{
                            alignSelf: "center",
                            // left: Dimensions.get("window").width * 0.25,
                            // top: Dimensions.get("window").height * 0.25,
                            borderWidth: 2,
                            transform: [{ scaleX: 2 }, { scaleY: 2 }],
                            minWidth: Dimensions.get("window").width,
                            minHeight: Dimensions.get("window").height,
                            opacity: 0.1,
                            zIndex: 0,
                            display: "flex",
                            position: "absolute",
                        }}
                        height={50}
                        width={50}
                        resizeMethod="resize"
                        resizeMode="center"
                        source={require("./SurajmalLogo.png")} // Replace with the actual image URL or local asset
                    ></ImageBackground>
                    {children}
                </LinearGradient>
            </ScrollView>
        </Provider>
    );
};

export default Wrapper;
