import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { fetchMarkers } from '../../actions/queries'

// const lat = 50.862889066389364
// const long = 4.35435052643958


const RegionEurope = {
    latitude: 50,
    longitude: 15,
    latitudeDelta: 40,
    longitudeDelta: 40,

    
}

export default function Map() {

    const navigation = useNavigation()

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async ()  => {
        const fetchedMarkers = await fetchMarkers()
        setMarkers(fetchedMarkers)
    }
    const [markers, setMarkers] = React.useState()



    return (
        <View style={styles.full}>
            <MapView
                style={styles.full}
                initialRegion={RegionEurope}
            >
                {markers?.map((marker, index) => (
                    // <TouchableOpacity style={{backgroundColor:"red"}}>
                        <Marker 
                            onPress={()=>navigation.navigate('TreeImage', {data:marker})}
                            style={{flex:1}}
                            key={index}
                            coordinate={{latitude: marker.latitude, longitude : marker.longitude}}
                            title={marker.title}
                            description={"marker.description"}
                            image={require('../../assets/tree.png')}
                        />
                    // </TouchableOpacity>
                    
                ))}
            </MapView>
            <View style={[styles.center, ]}>
                <TouchableOpacity 
                style={styles.button}
                onPress={()=> navigation.navigate('Plant')}
                >
                    <Text style={styles.txt}>Plant a tree!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    full: {
        flex:1,
    },
    center:{
        justifyContent:'center',
        alignItems:'center'  
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
    txt:{
        color:'white',
        fontWeight:'bold',
        fontSize:24
    }
})