import React from 'react'
import { View, Text,StyleSheet, Image , Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

// 400 x 156 
// 1 : 0.39

const { width, height } = Dimensions.get("window")
const imageWidth = width * 0.6
const imageHeight = imageWidth * 0.39


export default function Login() {
    const navigation = useNavigation() 

    

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Rotary_int_logo.png')} style={styles.logoImage}/>
            <Text>Login screen</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('TabNavigator', { screen: 'Home' })}>
                <Text>Navigate</Text>
            </TouchableOpacity>
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