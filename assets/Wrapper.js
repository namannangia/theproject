import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    FlatList,
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
                        colors={["#009688"]}
                    />
                }
            >
                <StatusBar hidden />
                <LinearGradient
                    colors={["white", "#303090", "rgb(48,48,146)"]}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    style={{
                        height: Dimensions.get("screen").height * 0.88,
                        width: Dimensions.get("screen").width,
                    }}
                >
                    <ImageBackground
                        style={{
                            alignSelf: "center",
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
