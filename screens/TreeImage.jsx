import { View, Text, Image ,Dimensions, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {  useRoute } from '@react-navigation/core';
import Btn from '../components/BackBtn';


const { width, height } = Dimensions.get("window")

export default function TreeImage() {

    const { data } = useRoute().params

    return (
        <View style={styles.container}>
            <Btn/>
            <Image 
                source={{uri: data?.image}} 
                style={styles.image}
            />
            <View style={{width:'100%', justifyContent:'center',alignItems:'center',marginVertical:20}}>
                <View style={[styles.clubStat]}>
                    <Text style={styles.clubIndex} >1</Text>
                    <Text style={styles.clubName} >{data.clubName}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.clubTrees} >{data?.trees}</Text>
                        <Image source={(require('../assets/tree.png'))} style={{width:30,height:30,marginRight:10}}  />

                    </View>
                    
                    

                </View>
            </View>

            <View style={styles.containerInfo}>
                <View style={styles.row}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfo}>
                            Trees: 
                        </Text>
                        <Text style={styles.textNum}>
                            {data.trees}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfo}>
                            Members: 
                        </Text>
                        <Text style={styles.textNum}>
                            {Math.ceil(data.trees /5) }
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfo}>
                            Plantations: 
                        </Text>
                        <Text style={styles.textNum}>
                            1
                        </Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfo}>
                            Radius:
                        </Text>
                        <Text style={styles.textNum}>
                            6
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.textInfo}>
                            Leader:
                        </Text>
                        
                    </View>
                    <Text style={styles.textNum}>
                        Michael Skup
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={()=> alert("Featre coming soon!")} style={styles.button}>
                <Text style={styles.btnTxt}>Contact</Text>
            </TouchableOpacity>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        // backgroundColor:'white'
    },
    image:{
        width: width, 
        height: width * (800/ 1200), 
        zIndex:-1,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

    
    },
    clubStat:{
        flexDirection:'row',
        height:60,
        width:'80%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        borderRadius:10
    },
    clubName:{
        color:"#17458f",
        fontSize:20,
        fontWeight:'bold',
        marginHorizontal:20,
        flex:1
    },
    clubIndex:{
        color:"grey",
        fontSize:20,
        fontWeight:'bold',
        marginHorizontal:20
    },
    clubTrees:{
        color:"#1c01ff",
        fontSize:20,
        fontWeight:'bold',
        marginHorizontal:5
    },
    containerInfo:{
        width:'80%',
        paddingVertical:30,
        backgroundColor:'white',
        borderRadius:10
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    row:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    textInfo:{
        margin:10,
        fontSize:20,
        
    },
    textNum: {
        margin:10,
        fontSize:20,
        fontWeight:'bold'
    },
    button:{
        paddingVertical:15,
        paddingHorizontal:15,
        borderRadius:20,
        backgroundColor:'#17458f',
        position:'absolute',
        bottom:30,
        zIndex:2
    },
    btnTxt:{
        color:'white',
        fontSize:24,
        fontWeight:'bold'
    },
})