import firestore, { firebase } from '@react-native-firebase/firestore';


export const fetchMarkers = async () => {
    
    try{
    
        const doc = await firestore().collection('plantations').get()
        let array = [] 
        doc.forEach((markers) => {
            array.push(markers.data())
        })
        
        return array
    }catch(e){
        alert(e)
    }
}