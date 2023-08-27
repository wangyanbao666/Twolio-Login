import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function CustomButton({title, onPress, style}){
    const styles = StyleSheet.create({
        button: {
            borderRadius: 8,
            padding: 10,
            color: "#f5f7fa",
            backgroundColor: style.backgroundColor,
            width: style.width,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25
        },
        buttonText:{
            color: style.color
        }
    })
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}


