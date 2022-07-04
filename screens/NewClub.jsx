import { StyleSheet, Text, View , TextInput,Picker, TouchableOpacity, Image, Dimensions} from 'react-native'
import React from 'react'
import BackBtn from '../components/BackBtn'
import CountryPicker , { DARK_THEME } from 'react-native-country-picker-modal'
import { registerClub } from '../actions/queries'
import { useNavigation } from '@react-navigation/native'
import uuid from "uuid";

const {width,height} = Dimensions.get("window")

export default function NewClub() {
    

    const [ clubName, setClubName ] = React.useState('')
    const [ clubEmail, setClubEmail ] = React.useState('')
    const [ clubPresident, setClubPresident ] = React.useState('')
    const [ country, setCountry ] = React.useState('Poland')
    const [ modalVisible, setModalVisible ] = React.useState(false)
    const [withAlphaFilter, setWithAlphaFilter] = React.useState(true)
    

    const navigation = useNavigation()


    const onSelect = async (country) => {
        setCountry(country.name)
    }

    const register = async () => {
        try {
            if (clubName !== '' && clubEmail !== '' && clubPresident !== ''){
                const id = uuid.v4()
                let data = {
                    country: country,
                    name:clubName,
                    email:clubEmail,
                    president:clubPresident,
                    trees:0,
                    uid:id
                }
                await registerClub(data)
                alert('Club Registered Successfully')
                navigation.goBack()
            }else{
                alert("You forgot to write specify the name or email!")
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <View style={{flex:1, backgroundColor:'rgb(5,160,5)'}}>
            <Image 
            source={require('../assets/background.png')} 
            style={{width:width,height:height+50, position:'absolute',top:0, left:0}}
            />
            <BackBtn/>
            <View style={styles.container} >
                <Text style={styles.titleTxt}>Register club</Text>
                
            <TouchableOpacity onPress={()=> setModalVisible(true)} style={[styles.countryBtn, styles.shadow, styles.center]}>
                <CountryPicker
                
                    withEmoji={true}
                        {...{
                        withAlphaFilter,
                        onSelect,
                        }}
                    visible={modalVisible}
                    
                    />
                    <Text style={{fontSize:20,margin:2, fontWeight:'bold', }}>{country}</Text>
            </TouchableOpacity>
                <TextInput 
                backgroundColor={"rgba(0,0,0,0.1)"} 
                style={{width:'60%', height:70, borderRadius:15, margin:10, }} 
                textAlign={'center'}
                onChangeText={(input)=>setClubName(input)}
                placeholder="Club Name"
                color="white"
                fontSize={18}
                placeholderTextColor={'white'}

                
                />
                <TextInput 
                backgroundColor={"rgba(0,0,0,0.1)"} 
                style={{width:'60%', height:70, borderRadius:15, margin:10}} 
                textAlign={'center'}
                onChangeText={(input)=>setClubEmail(input)}
                placeholder="Representative Email"
                fontSize={18}
                color="white"
                placeholderTextColor={'white'}

                />
                <TextInput 
                backgroundColor={"rgba(0,0,0,0.1)"} 
                style={{width:'60%', height:70, borderRadius:15, margin:10}} 
                textAlign={'center'}
                onChangeText={(input)=>setClubPresident(input)}
                placeholder="Club President"
                fontSize={18}
                color="white"
                placeholderTextColor={'white'}


                />
                
                <TouchableOpacity 
                style={styles.button}
                onPress={()=> register()}>
                    <Text style={styles.btnTxt}>Register Rotary Club</Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{ 
        alignItems:'center',
        flex:1,
        // justifyContent:'center'

    },
    countryBtn:{
        width:'60%', 
        height:70,
        backgroundColor:'white',
        marginTop:15,
        marginBottom:5,
        borderRadius:20,


    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    titleTxt:{
        marginTop:50,
        marginBottom:40,
        fontSize:24,
        fontWeight:"bold",
        color:'white'
        
    },

    button:{
        paddingVertical:15,
        paddingHorizontal:15,
        borderRadius:20,
        backgroundColor:'#17458f',
        zIndex:2,
        margin:30

    },
    btnTxt:{
        color:'white',
        fontSize:24,
        fontWeight:'bold'
    },
    
})