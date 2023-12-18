import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        border: "5px solid black",
        backgroundColor: "#F5F7F8",
    },

    button: {
        backgroundColor: "#3D3DB6",
        padding: 10,
        borderRadius: 10,
        margin: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        fontFamily: "Montserrat-Light",
    },
    textIn: {
        flex: 1,
        fontSize: 40,
        maxHeight: 50,
        backgroundColor: "#7C81AD",
        textAlign: "center",
        borderRadius: 200,
        padding: 10,
        margin: 15,
    },
});
