import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { fetchMarkers } from '../../actions/queries'

// const lat = 50.862889066389364
// const long = 4.35435052643958

export default function Map() {

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
                
            >
                {markers?.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{latitude: marker.latitude, longitude : marker.longitude}}
                        title={marker.title}
                        description={"marker.description"}
                        image={require('../../assets/tree.png')}
                    />
                ))}
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    full: {
        flex:1,

    }
})