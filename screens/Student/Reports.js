import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/commstyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataTable } from "react-native-paper";
import Wrapper from "../../assets/Wrapper";

const Reports = ({ navigation }) => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );
    const abc = new Date();
    const [items] = React.useState([
        {
            key: 1,
            name: "8:00 - 9:00",
            Class: "Java (Room - 110)",
        },
        {
            key: 2,
            name: "9:00 - 11:00",
            Class: "Cloud Computing (Lab - 4)",
        },
        {
            key: 3,
            name: "11:00 - 12:00",
            Class: "Cloud Computing (Room - 210)",
        },
        {
            key: 4,
            name: "12:00 - 12:30",
            Class: "Lunch Break",
        },
        {
            key: 5,
            name: "12:30 - 1:30",
            Class: "Operating System (Room - 110)",
        },
        {
            key: 6,
            name: "1:30 - 2:30",
            Class: "Computer Graphics (Room - 110)",
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
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const dataset = {};
    return (
        <Wrapper refreshing={false} fetchData={() => {}}>
            <SafeAreaView style={{ alignItems: "center" }}>
                <Text
                    style={{
                        fontSize: 20,
                        padding: 20,
                        fontFamily: "Montserrat-Bold",
                    }}
                >
                    {dayMap[abc.getDay()]}'s Schedule
                </Text>
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
                    </DataTable.Header>

                    {items.map((item) => (
                        <DataTable.Row key={item.key}>
                            <DataTable.Cell
                                textStyle={{
                                    fontFamily: "Montserrat-Italic",
                                    color: "black",
                                    fontSize: 16,
                                }}
                            >
                                {item.name}
                            </DataTable.Cell>
                            <DataTable.Cell
                                textStyle={{
                                    fontFamily: "Montserrat-Italic",
                                    color: "black",
                                    fontSize: 16,
                                }}
                                numeric
                            >
                                {item.Class}
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </SafeAreaView>
        </Wrapper>
    );
};

export default Reports;
