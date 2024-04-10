import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default Registeration = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <TextInput
          onChangeText={(e) => {
            setUsername(e);
            console.log(e);
          }}
          value={username}
        />
        <TextInput
          onChangeText={(e) => {
            setPassword(e);
          }}
          secureTextEntry
          value={password}
        />
        <Button
          mode="contained"
          onPress={() => {
            axios
              .post("xyz.com", {
                username: username,
                pass: password,
              })
              .then((data) => {
                if (data.status === 200) {
                  if (data.data.token)
                    AsyncStorage.setItem("token", data.data.token);
                } else {
                  alert("Api request failed");
                }
              })
              .catch((e) => {
                console.error("Error at Api Call> ", e);
              });
          }}
        >
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};
