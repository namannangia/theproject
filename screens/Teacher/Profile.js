import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/commstyles";
import { AuthService } from "../../Api/AuthService";
import { CommonActions } from "@react-navigation/native";
import Wrapper from "../../assets/Wrapper";
import { Button } from "react-native-paper";

const Profile = ({ route, navigation }) => {
    const [uname, setuname] = React.useState("");
    React.useEffect(() => {
        async function callme() {
            const usrdata = await AuthService.getUserName();
            if (usrdata) setuname(usrdata.Name);
        }
        callme();
    }, []);
    return (
        <Wrapper
            refreshing={false}
            fetchData={() => {
                console.log("Refreshin");
            }}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: "transparent",
                        justifyContent: "space-evenly",
                    },
                ]}
            >
                <Text
                    style={{
                        color: "#303090",
                        fontSize: 25,
                        fontFamily: "Montserrat-Bold",
                    }}
                >
                    Welcome, {uname}
                </Text>
                <Button
                    icon={"key"}
                    mode="contained"
                    buttonColor="#303090"
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
                    Log out
                </Button>
            </View>
        </Wrapper>
    );
};

export default Profile;
