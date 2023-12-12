import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import styles from "../Root/commstyles";
import axios from "axios";
import { AuthService } from "../../AuthService";
import Card from "./Card";
const Classes = ({ route, navigation }) => {
    const [classArr, setClassArr] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    React.useEffect(() => {
        async function callme() {
            AuthService.getUserName().then((data) => {
                console.log("classes data", data);
                axios
                    .post(
                        "https://3fdj0rzk-3001.inc1.devtunnels.ms/createClass/" +
                            data.id._id,
                        { title: title, description: description }
                    )
                    .then((data2) => {
                        console.log(data2.data);
                    })
                    .catch((err) => {
                        console.log("teacher.classesdetail 20:", err);
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
            <TextInput
                style={styles.textIn}
                placeholder="Enter Password"
                value={title}
                onChangeText={(t) => setTitle(t)}
            ></TextInput>
            <TextInput
                style={styles.textIn}
                placeholder="Enter Password"
                value={description}
                onChangeText={(t) => setDescription(t)}
            ></TextInput>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Classes;
