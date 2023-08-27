import { TextInput, View, Text, ToastAndroid } from "react-native";
import { StyleSheet } from "react-native";
import GoBackButton from "../components/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import config from "../config";
import { useState } from "react";
import axios from "axios";
import { setGlobalPhoneNum } from "../redux/phoneNum/phoneNumSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { otpTimeReset } from "../redux/otpTime/otpTimeSlice";

export default function RegisterScreen(){
    const navigate = useNavigation()
    const [username, setUsername] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [correctPassword, setCorrectPassword] = useState(true)
    const globalPhoneNum = useSelector(state => state.phoneNum.value)
    const otpTime = useSelector(state => state.otpTime.value)
    const dispatch = useDispatch()

    const handleGoBack = () => {
        console.log("go back")
        navigate.navigate("Login");
    };
    const register = () => {
        if (username === ""){
            ToastAndroid.show("username could not be empty", ToastAndroid.SHORT)
            return
        }
        if (phoneNum === ""){
            ToastAndroid.show("phone number could not be empty", ToastAndroid.SHORT)
            return
        }
        if (!phoneNum.startsWith("+")){
            ToastAndroid.show("the phone number should start with +country_code", ToastAndroid.SHORT)
            return
        }
        if (password === ""){
            ToastAndroid.show("password could not be empty", ToastAndroid.SHORT)
            return
        }
        if (!correctPassword){
            ToastAndroid.show("confirm password not match", ToastAndroid.SHORT)
            return
        }
        if (otpTime===0 || phoneNum === globalPhoneNum){
            axios({
                url: config.url.REGISTERURL,
                method: "POST",
                data: {
                    username: username,
                    password: password,
                    phoneNum: phoneNum
                },
            }).then(res => {
                let data = res.data
                if (data.status === 200){
                    dispatch(setGlobalPhoneNum(phoneNum))
                    dispatch(otpTimeReset())
                    navigate.navigate("Auth")
                }
                else if (data.status === 300){
                    ToastAndroid.show("the phone number has been registered", ToastAndroid.SHORT)
                }
            });
        }
    }

    const comparePass = (text) => {
        let check = text === password
        setCorrectPassword(check)
    }
    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <GoBackButton onPress={handleGoBack} styles={styles.goBackButton}></GoBackButton>
            <View style={styles.content}>
                <Text style={styles.title}>Account Information</Text>
                <TextInput style={styles.input} placeholder="username" onChangeText={text => setUsername(text)}></TextInput>
                <TextInput style={styles.input} placeholder="phone number" onChangeText={text => setPhoneNum(text)}></TextInput>
                <TextInput style={styles.input} placeholder="password" onChangeText={text => setPassword(text)}></TextInput>
                <View style={{marginBottom:20}}>
                    <TextInput style={{...styles.input, marginBottom:1}} placeholder="confirm password" onChangeText={
                        text => {
                            setConfirmPass(text)
                            comparePass(text)
                        }
                        }></TextInput>
                    {!correctPassword && <Text style={styles.passwordNotMatchText}>password not match!</Text>}
                </View>
                <CustomButton style={styles.button} title={"REGISTER"} onPress={register}></CustomButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    title: {
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
    goBackButton: {
        position: "absolute",
        marginTop: "12%",
        screenLeft: 0,
    },
    passwordNotMatchText: {
        position: "absolute",
        top: "95%",
        fontSize: 10,
        paddingLeft: 5,
    },
    button: {
        color: "white",
        backgroundColor: "#59a7f0"
    }
  });