import { event } from "jquery";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import GoBackButton from "../components/GoBackButton.js";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton.js";
import { useDispatch, useSelector } from "react-redux";
import { otpTimeReset } from "../redux/otpTime/otpTimeSlice.js";
import axios from "axios";
import config from "../config.js";

export default function AuthScreen(){
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const [token, setToken] = useState({})
    const navigate = useNavigation()
    const otpTime = useSelector(state => state.otpTime.value)
    const globalPhoneNum = useSelector(state => state.phoneNum.value)
    const dispatch = useDispatch();
    let opts = []
    function handleTextChange(text, idx){
        setToken(prevToken => {
            let newToken = {...prevToken}
            newToken[idx] = text
            return newToken
        })
        if (text.length === 0){
            return
        }
        if (idx!==5){
            inputRefs[idx+1].current.focus()
        }
    }
    function handleDelete(event, idx){
        console.log(event.nativeEvent)
        if (event.nativeEvent.key == "Backspace"){
            if (idx>0){
                console.log(token[idx])
                if (token[idx]===undefined || token[idx]===""){
                    inputRefs[idx-1].current.focus()
                }
            }
        }
    }
    function resend(){
        if (otpTime==0){
            // axios({
            //     url: config.url.REGISTERURL,
            //     method: "POST",
            //     data: {
            //         username: username,
            //         password: password,
            //         phoneNum: phoneNum
            //     },
            // }).then(res => console.log(res.data));
            dispatch(otpTimeReset())
        }
    }
    function verify(){
        let code = ""
        for (let i=0;i<6;i++){
            if (token[i]===undefined || token[i]===""){
                ToastAndroid.show("please fill in the verification code", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                return
            }
            code += token[i]
        }
        axios({
            url: config.url.VERIFYURL,
            method: "POST",
            data: {
                phoneNum: globalPhoneNum,
                otpCode: code
            }
        }).then(res => {
            let data = res.data
            if (data.status === 200){
                ToastAndroid.show("verified successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                navigate.navigate("Login")
            }
            else if (data.status === 300){
                ToastAndroid.show("the verification code is wrong", ToastAndroid.SHORT)
            }
        })
    }
    const handleGoBack = () => {
        console.log("go back")
        navigate.navigate("Register");
    };
    return (
        <View style={styles.container}>
            <StatusBar></StatusBar>
            <GoBackButton onPress={handleGoBack} styles={styles.goBackButton}></GoBackButton>
            <View style={styles.content}>
                <Text style={styles.title}>Enter Otp Code</Text>
                <View style={styles.opt_container}>
                    {
                        inputRefs.map((inputRef, idx) => {
                            let newOptBox = <TextInput ref={inputRef} style={styles.opt_code} maxLength={1} key={idx} keyboardType="numeric"
                            onChangeText={(text) => handleTextChange(text,idx) } 
                            onKeyPress={(event) => handleDelete(event, idx)}></TextInput>
                            opts.push(newOptBox)
                            return newOptBox
                        })
                    }
                </View>
                <TouchableOpacity style={styles.resend} onPress={resend}>
                    <Text>{otpTime>0 ? `resend after ${otpTime}s` : "resend"}</Text>
                </TouchableOpacity>
                <CustomButton style={styles.verify_button} title={"VERIFY"} onPress={verify}></CustomButton>
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
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center"
    },
    opt_container: {
        width: 350,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    opt_code: {
        width: 40,
        height: 50,
        borderColor: "black",
        borderWidth: 2,
        textAlign: "center",
        fontSize: 30
    },
    goBackButton: {
        position: "absolute",
        marginTop: "12%",
        screenLeft: 0,
    },
    verify_button: {
        width: "fit-content",
        color: "white",
        backgroundColor: "#59a7f0",
        width: 100,
    },
    resend: {
        position: "absolute",
        right: "10%",
        bottom: "10%"
    }
})