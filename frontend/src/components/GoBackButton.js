import { View, Image, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"

export default function GoBackButton({onPress, styles}){
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles}>
                <Image style={style.img} source={require("../../assets/goBackButton.png")}></Image>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    img: {
        width: 50, 
        height: 50, 
    }
})