import React, { useEffect } from 'react'
import { View, Text,StyleSheet, Image , Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
const delay = ms => new Promise(res => setTimeout(res, ms));

// 400 x 156 
// 1 : 0.39

const { width, height } = Dimensions.get("window")
const imageWidth = width * 0.6
const imageHeight = imageWidth * 0.39


export default function Login() {
    const navigation = useNavigation() 

    useEffect( () => {
        triggerDelay()
    }, []);
    
    const triggerDelay = async () => {
        await delay(1000)
        navigation.navigate('TabNavigator', { screen: 'Home' })
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Rotary_int_logo.png')} style={styles.logoImage}/>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    logoImage: {
        width:imageWidth, 
        height:imageHeight, 
        margin:20
    }
})