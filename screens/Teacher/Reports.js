import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/commstyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, DataTable } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import Wrapper from "../../assets/Wrapper";

const Reports = ({ navigation }) => {
    const abc = new Date();
    const [items] = React.useState([
        {
            key: 1,
            time: "8:00 - 9:00",
            Class: "BCA 5 A",
            subject: "Java Theory",
            room: "110",
        },
        {
            key: 2,
            time: "9:00 - 11:00",
            Class: "BCA 6 A",
            subject: "Java Lab",
            room: "Lab 3",
        },
        {
            key: 3,
            time: "11:00 - 12:00",
            Class: "BCA 3 A",
            subject: "Cloud Com...",
            room: "101",
        },
    ]);
    const dayMap = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };
    return (
        <Wrapper refreshing={false} fetchData={() => {}}>
            <SafeAreaView>
                <ScrollView>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexDirection: "column",
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    padding: 20,
                                    fontFamily: "Montserrat-Bold",
                                }}
                            >
                                {dayMap[abc.getDay()]}'s Schedule
                            </Text>
                        </View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title
                                    textStyle={{
                                        fontFamily: "Montserrat-Bold",
                                        color: "black",
                                        fontSize: 16,
                                    }}
                                >
                                    Time
                                </DataTable.Title>
                                <DataTable.Title
                                    textStyle={{
                                        fontFamily: "Montserrat-Bold",
                                        color: "black",
                                        fontSize: 16,
                                    }}
                                    numeric
                                >
                                    Class
                                </DataTable.Title>
                                <DataTable.Title
                                    textStyle={{
                                        fontFamily: "Montserrat-Bold",
                                        color: "black",
                                        fontSize: 16,
                                    }}
                                    numeric
                                >
                                    Subject
                                </DataTable.Title>
                                <DataTable.Title
                                    textStyle={{
                                        fontFamily: "Montserrat-Bold",
                                        color: "black",
                                        fontSize: 16,
                                    }}
                                    numeric
                                >
                                    Room
                                </DataTable.Title>
                            </DataTable.Header>

                            {items.map((item) => (
                                <DataTable.Row key={item.key}>
                                    <DataTable.Cell
                                        textStyle={{
                                            fontFamily: "Montserrat-Italic",
                                            color: "black",
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.time}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            fontFamily: "Montserrat-Italic",
                                            color: "black",
                                            fontSize: 14,
                                        }}
                                        numeric
                                    >
                                        {item.Class}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            fontFamily: "Montserrat-Italic",
                                            color: "black",
                                            fontSize: 14,
                                        }}
                                        numeric
                                    >
                                        {item.subject}
                                    </DataTable.Cell>
                                    <DataTable.Cell
                                        textStyle={{
                                            fontFamily: "Montserrat-Italic",
                                            color: "black",
                                            fontSize: 14,
                                        }}
                                        numeric
                                    >
                                        {item.room}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                        <Button
                            onPress={() => {
                                navigation.navigate("ClassesPage2");
                            }}
                            style={{
                                shadowOffset: { height: 0, width: 0 },
                                shadowOpacity: 0.8, // Set the opacity (0 to 1)
                                shadowRadius: 5,
                                shadowColor: "black",
                                elevation: 5,
                                display: "flex",
                                margin: 50,
                            }}
                            icon={"pencil"}
                            mode="elevated"
                            buttonColor="#F5F7F8"
                            textColor="#3D3DB6"
                        >
                            Edit Schedule
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Wrapper>
    );
};

export default Reports;
