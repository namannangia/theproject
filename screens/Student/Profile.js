import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/commstyles";
import { AuthService } from "../../Api/AuthService";
import { CommonActions } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Wrapper from "../../assets/Wrapper";

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
    const [refreshing, setRefreshing] = React.useState(false);
    const fetchData = () => {
        console.log("Fetching data");
    };

    return (
        <Wrapper refreshing={refreshing} fetchData={fetchData}>
            <View
                style={[
                    styles.container,
                    {
                        justifyContent: "space-evenly",
                        backgroundColor: "transparent",
                    },
                ]}
            >
                <Text
                    style={{
                        marginTop: 30,
                        fontSize: 30,
                        fontFamily: "Montserrat-Bold",
                    }}
                >
                    Welcome {uname}
                </Text>

                <Button
                    style={{ margin: 20 }}
                    // icon="pencil"
                    mode="contained"
                    buttonColor="#3D3DB6"
                    // style={[styles.button]}
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
                    {/* <Text style={[styles.buttonText, { fontSize: 14 }]}> */}
                    Log out
                    {/* </Text> */}
                </Button>
                <Button
                    style={{ margin: 20 }}
                    icon="pencil"
                    mode="contained"
                    buttonColor="#3D3DB6"
                    onPress={() => showModal()}
                >
                    Edit Schedule
                </Button>
            </View>
        </Wrapper>
    );
};

export default Profile;
