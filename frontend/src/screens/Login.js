import { StatusBar } from "expo-status-bar";
import { TextInput, Text, View, Button, TouchableOpacity, ToastAndroid } from "react-native";
import { StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { useRef, useState } from "react";
import config from "../config.js"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen(){
    const phoneNumRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigation();

    const [state, setState] = useState({
        phoneNum: "",
        password: "",
    });
    function login(){
        axios({
            url: config.url.LOGINURL,
            method: "POST",
            data: {
                phoneNum: state.phoneNum,
                password: state.password
            }
        }).then(res => {
            let data = res.data;
            if (data.status === 200){
                navigate.navigate("Home")
            }
            else if (data.status === 400){
                ToastAndroid.show("The phone number or password is incorrect", ToastAndroid.SHORT)
            }
        })
    }

    function jumpToRegister(){
        navigate.navigate("Register")
    }
    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <Text style={styles.loginTitle}>Login</Text>
            <TextInput ref={phoneNumRef} onChangeText={(value) => setState({...state,phoneNum:value})} placeholder="phone number" style={styles.input}></TextInput>
            <TextInput ref={passwordRef} onChangeText={(value) => setState({...state,password:value})} placeholder="password" secureTextEntry={true} style={styles.input}></TextInput>
            <TouchableOpacity>
                <Text onPress={jumpToRegister}>Create an account</Text>
            </TouchableOpacity>
            <CustomButton title={"LOGIN"} onPress={login} style={styles.button}></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTitle: {
        fontSize: 30,
        marginBottom: 20,
    },
    input: {
        fontSize: 20,
        backgroundColor: 'yellow',
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        width: 250,
        marginBottom:20
    },
    button: {
        color: "white",
        backgroundColor: "#59a7f0"
    }
  });