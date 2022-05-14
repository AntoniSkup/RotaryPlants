import { StyleSheet, Text, View , TextInput,Picker, TouchableOpacity} from 'react-native'
import React from 'react'
import BackBtn from '../components/BackBtn'
import CountryPicker , { DARK_THEME } from 'react-native-country-picker-modal'
import { registerClub } from '../actions/queries'
import { useNavigation } from '@react-navigation/native'
import uuid from "uuid";


export default function NewClub() {
    

    const [ clubName, setClubName ] = React.useState('')
    const [ clubEmail, setClubEmail ] = React.useState('')
    const [ country, setCountry ] = React.useState('Poland')
    const [ modalVisible, setModalVisible ] = React.useState(false)
    const [withAlphaFilter, setWithAlphaFilter] = React.useState(true)
    

    const navigation = useNavigation()


    const onSelect = async (country) => {
        setCountry(country.name)
    }

    const register = async () => {
        try {
            if (clubName !== '' && clubEmail !== ''){
                const id = uuid.v4()
                let data = {
                    country: country,
                    name:clubName,
                    email:clubEmail,
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
        <View style={{flex:1}}>
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
                fontSize={18}
                
                />
                <TextInput 
                backgroundColor={"rgba(0,0,0,0.1)"} 
                style={{width:'60%', height:70, borderRadius:15, margin:10}} 
                textAlign={'center'}
                onChangeText={(input)=>setClubEmail(input)}
                placeholder="Representative Email"
                fontSize={18}
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
        width:200,
        height:60,
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