import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login.js';
import HomeScreen from './screens/Home.js';
import RegisterScreen from './screens/Register.js';
import AuthScreen from './screens/Auth.js';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { otpTimeReduce } from './redux/otpTime/otpTimeSlice.js';

export default function Main(){
    const dispatch = useDispatch()
    useEffect(() => {
        const interval = setInterval(() => {
        dispatch(otpTimeReduce());
        }, 1000); // Increment every 1 second

        return () => clearInterval(interval); // Clear interval on unmount
    }, [dispatch]);
    const Stack = createStackNavigator(); // Declare the Stack constant
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName="Auth">   
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });