import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Root/commstyles";
import { AuthService } from "../../AuthService";
import { CommonActions } from "@react-navigation/native";

const Profile = ({ route, navigation }) => {
    const [uname, setuname] = React.useState("");
    React.useEffect(() => {
        async function callme() {
            const usrdata = await AuthService.getUserName();
            if (usrdata) setuname(usrdata.id.Name);
        }
        callme();
    }, []);
    return (
        <View style={styles.container}>
            <Text>Welcome {uname}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    await AuthService.logout();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "Home",
                                },
                            ],
                        })
                    );
                }}
            >
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;
