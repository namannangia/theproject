import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import styles from "../Root/commstyles";
import axios from "axios";
import { AuthService } from "../../AuthService";
import Card from "./Card";
const ClassesDetailed = ({ route, navigation }) => {
    const [classArr, setClassArr] = React.useState([]);
    React.useEffect(() => {
        async function callme() {
            AuthService.getUserName().then((data) => {
                console.log("classes data", data);
                axios
                    .post(
                        "https://3fdj0rzk-3001.inc1.devtunnels.ms/getClasses/" +
                            data.id._id
                    )
                    .then((data2) => {
                        for (x of data2.data.payload)
                            setClassArr((e) => [x, ...e]);
                    })
                    .catch((err) => {
                        console.log("teacher.classes 20:", err);
                    });
            });
        }
        callme();
        return () => {
            setClassArr([]);
        };
    }, []);

    return (
        <SafeAreaView style={styles.container2}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ClassesPage2");
                }}
                style={[styles.button, { marginTop: 40 }]}
            >
                <Text>Add a class ➕</Text>
            </TouchableOpacity>
            {classArr.length !== 0 ? (
                <View>
                    {classArr.map((a, b) => {
                        return <Card navigation={navigation} key={b} a={a} />;
                    })}
                </View>
            ) : (
                <Text style={{ fontStyle: "italic" }}>Loading...</Text>
            )}
        </SafeAreaView>
    );
};

export default ClassesDetailed;
