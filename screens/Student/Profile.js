import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Root/commstyles";
import { AuthService } from "../../AuthService";

const Profile = ({ route, navigation }) => {
    const [uname, setUname] = React.useState("");
    React.useEffect(() => {
        const checkLoginState = async () => {
            try {
                const userData = await AuthService.getUserName();
                if (userData) {
                    setUname(userData.Name);
                } else {
                    console.log("User data not found, navigating to HOME");
                    navigation.navigate("Home");
                }
            } catch (error) {
                console.error("Error1 checking login state:", error);
            }
        };

        checkLoginState();
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
