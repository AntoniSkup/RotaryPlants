import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, PixelRatio, Switch, Picker, TextInput, Permission, PermissionsAndroid, TouchableOpacity} from 'react-native'
import CountryPicker , { DARK_THEME } from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../src/types'
import { fetchClubsInCountry, updateClubData } from '../actions/queries'
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/core';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { uploadPhoto } from '../actions/imageUpload'
import storage from '@react-native-firebase/storage';
import uuid from "uuid";
import Btn from '../components/BackBtn'

import {  uploadPlantation } from '../actions/queries'




const {width,height} = Dimensions.get("window")

//image= 1200 x 630

export default function Plant() {


    const navigation = useNavigation()

    const [hasPermission, setHasPermission] = ImagePicker.useCameraPermissions();

    const [country, setCountry ] = React.useState("Poland")
    const [clubs, setClubs ] = React.useState()
    const [selectedClub, setSelectedClub ] = React.useState()
    const [currentLongitude,setCurrentLongitude] = React.useState(0)
    const [currentLatitude,setCurrentLatitude] = React.useState(0)
    const [imageLocal, setImageLocal] = React.useState('');
    const [numberOfTrees, setNumberOfTrees] = React.useState(0);
    const [imageURL, setImageURL] = React.useState('');
    const [withAlphaFilter, setWithAlphaFilter] = React.useState(true)
    const [ modalVisible, setModalVisible ] = React.useState(false)

    const [reference, setReference] = React.useState(storage().ref(`${uuid.v4()}`));

    const [locationStatus,setLocationStatus] = React.useState('');
    


    const uploadPlant = () => {
        if (imageURL !== '' && imageLocal !== ''){
            const allData = {
                country:country,
                clubName:selectedClub.name,
                clubID:selectedClub.uid,
                clubEmail:selectedClub.email,
                latitude: currentLatitude,
                longitude:currentLongitude,
                trees: parseInt(numberOfTrees),
                image:imageURL
            }
            uploadPlantation(allData)
            updateClubData(allData)
            navigation.goBack()
            alert("Success! Refresh the app to see your plant")
        }else{
            alert("You forgot to upload the picture!")
        }

    }
    
    const openLibrary = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === "granted") {
                const image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: false
                });
                if (!image.cancelled) {
                    
                    // const url = await this.props.uploadPhoto(image);
                    // this.props.updatePhoto(url);
                    setImageLocal(image.uri)

                    // const image = uploadPhoto(image)
                    
                    const task = await reference.putFile(image.uri);
                    const url = `https://firebasestorage.googleapis.com/v0/b/rotary-332120.appspot.com/o/${task.metadata.name}?alt=media&token`
                    // alert(task[1])
                    setImageURL(url)
                    // alert(url)
                    // alert('done')
                }
            }
        } catch (error) {
            alert(error)
        }
        
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation();

        } else {
            try {

                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();
                    setLocationStatus('Permission Granted');
                    
                } else {

                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                alert(err);
            }
        }
    };


    const getOneTimeLocation = () => {
        try {
            setLocationStatus('Getting Location ...');
            Geolocation.getCurrentPosition(
              //Will give you the current location
                (position) => {
                    setLocationStatus('You are Here');
            
                    //getting the Longitude from the location json
                    const currentLongitude = 
                    JSON.stringify(position.coords.longitude);
            
                    //getting the Latitude from the location json
                    const currentLatitude = 
                    JSON.stringify(position.coords.latitude);
            
                    //Setting Longitude state
                    setCurrentLongitude(Number(currentLongitude));
                    
                    //Setting Longitude state
                    setCurrentLatitude(Number(currentLatitude));
                },
                (error) => {
                    setLocationStatus(error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    // maximumAge: 1000
                },
            );
        } catch (error) {
            alert(error)
        }
        
    };






    React.useEffect(() => {
        fetchData();
        
        requestLocationPermission();

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const fetchData = async ()  => {
        const fetchedClubs = await fetchClubsInCountry("Poland")
        setClubs(fetchedClubs)
    }
        
    

    const onSelect = async (country) => {
        setCountry(country.name)
        const fetchedClubs = await fetchClubsInCountry(country.name)
        setClubs(fetchedClubs)
        setSelectedClub(fetchedClubs[0])

    }

    return (
        <View style={styles.container}>
            {/* <Image 
            source={require('../assets/background.png')} 
            style={{width:width,height:height+50, position:'absolute',top:0, left:0}}
            /> */}
            <Btn/>
            <TouchableOpacity onPress={()=> openLibrary()}>
                {
                    (imageLocal !== '')?
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{uri: imageLocal}} 
                            style={{ flex:1 ,         height: width * (800/ 1200), 
                            borderBottomRightRadius:50,
                            borderBottomLeftRadius:50,}}
                        />
                    </View>
                    :
                    <View style={styles.center}>
                        <View style={[styles.dim , {position:'absolute', }]}/>
                        <Image 
                        source={require('../assets/planting.jpg')} 
                        style={styles.dim_image}
                        />
                        
                        <Image 
                        source={require('../assets/upload.png')} 
                        style={{  width:100, height:100, position:'absolute', zIndex:10}}
                        />
                    </View>
                }
            </TouchableOpacity>
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

            <View
                style={[styles.countryBtn, styles.shadow, styles.center]}
            >
                <Picker
                    selectedValue={selectedClub}
                    // backgroundColor={"white"}
                    // borderRadius={20}
                    style={{width:'100%',height:'100%'}}
                    onValueChange={(itemValue, itemIndex) => {
                        
                        setSelectedClub(itemValue)
                    }}
                >
                    {clubs?.map((club, index) => (
                        <Picker.Item key={index} label={club.name} value={club} />
                    ))}
                </Picker>
            </View>

            <Text style={{margin:10, fontSize:20, fontWeight:"bold"}}>Number of trees</Text>
            <View style={[styles.circle, styles.center]}>
                <TextInput 
                textAlign='center' 
                fontSize={24} 
                fontWeight={'bold'} 
                style={{width:150, height:100}} 
                keyboardType={'number-pad'} 
                onChangeText={(input)=>setNumberOfTrees(input)}
                placeholder={"0"}
                color={'#17458f'}
                />
            </View>
            
            <TouchableOpacity 
            style={styles.button}
            onPress={()=> uploadPlant()}>
                <Text style={styles.btnTxt}>Plant the trees!</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity >
                <Text>{locationStatus}</Text>
            </TouchableOpacity>
            <Text>{currentLongitude}</Text>
            <Text>{currentLatitude}</Text> */}
            {/* <TouchableOpacity onPress={()=> alert(imageURL)}>
                <Text>Check</Text>
            </TouchableOpacity> */}

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
    ,
    dim:{
        backgroundColor:'rgba(0,0,0,0.5)',
        width:'100%',
        zIndex:2,
        
        height: width * (800/ 1200), 
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
    },
    dim_image:{
        width: width,

        height: width * (800/ 1200), 
        zIndex:-1,
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
    },
    imageContainer:{
        width: width,
        height: width * (800/ 1200), 
        borderBottomRightRadius:50,
        borderBottomLeftRadius:50,
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
    circle:{
        width:150,
        height:100,
        borderRadius:20,
        backgroundColor:'white'

        
    },
    button:{
        paddingVertical:15,
        paddingHorizontal:15,
        borderRadius:20,
        backgroundColor:'#17458f',
        zIndex:2,
        margin:50

    },
    btnTxt:{
        color:'white',
        fontSize:24,
        fontWeight:'bold'
    },
    
    
})