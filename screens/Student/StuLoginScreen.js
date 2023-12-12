import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../Root/commstyles";
import { AuthService } from "../../AuthService";

const StuLoginScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [showPass, setShowPass] = React.useState(false);
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 37, margin: 20 }}>
                Student Login Screen
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <TextInput
                    style={styles.textIn}
                    placeholder="Enter Email"
                    value={email}
                    keyboardType="email-address"
                    onChangeText={(t) => setEmail(t)}
                ></TextInput>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
                <TextInput
                    style={styles.textIn}
                    placeholder="Enter Password"
                    value={pass}
                    secureTextEntry={!showPass}
                    onChangeText={(t) => setPass(t)}
                ></TextInput>
                <TouchableOpacity
                    style={{
                        margin: 4,
                        padding: 15,
                        borderRadius: 200,
                    }}
                    onPress={() => setShowPass((e) => !e)}
                >
                    <Text style={styles.buttonText}>
                        {!showPass ? "👁️" : "🚫"}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    AuthService.login(email, pass, 0)
                        .then((obj) => {
                            console.log("Obj recvd:", obj);
                            if (obj !== "") navigation.navigate("StudentPage1");
                            else alert("Invalid Credentials");
                        })
                        .catch((err) => {
                            console.log("Error at stulogin:", err);
                        });
                }}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StuLoginScreen;
