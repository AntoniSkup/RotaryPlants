import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from "@expo/vector-icons";

const word = "<"
export default function BackBtn() {
    const navigation = useNavigation()
    return (
        <View style={{position:'absolute',top:40,height:60, width:'100%', zIndex:2}}>
            <TouchableOpacity 
            style={styles.background}
            onPress={()=> navigation.goBack()}
            
            >
                <FontAwesome name='angle-left' color={'white'} size={35} />
                {/* <Text style={styles.btn}>{word}</Text> */}
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        
        color:'white',
        fontSize:25,
        fontWeight:'bold'
    },
    background:{
        backgroundColor:"#17458f",
        borderRadius:20,
        width:60,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,
    }
})