import firestore, { storage , firebase } from '@react-native-firebase/firestore';
import uuid from "uuid";
import * as ImageManipulator from 'expo-image-manipulator';


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

export const fetchClubsInCountry = async (country) => {
    
    try{
    
        const doc = await firestore().collection('clubs').where('country' , '==', country).get()
        let array = [] 
        doc.forEach((country) => {
            array.push(country.data())
        })
        
        return array
    }catch(e){
        alert(e)
    }
}

export const uploadPlantation = async (data) => {
    try {
        const upload = data
			
        await firestore().collection('plantations').doc(data.id).set(upload)
    } catch (error) {
        alert(e)
    }
}

export const registerClub = async (data) => {
    try {
        await firestore().collection('clubs').doc(data.uid).set(data)
    } catch (error) {
        alert(error)
    }
}

export const updateClubData = async (data) => {
    try{

        await firestore().collection('clubs').doc(data.clubID).update({
            trees: firebase.firestore.FieldValue.increment(data.trees)
        })
    }
    catch (error) {
        alert(e)
    }
}

export const fetchAllClubs = async (data) => {
    try {
        const doc = await firestore().collection('clubs').orderBy('trees','desc').get()

        let array = [] 
        doc.forEach((post)=>{
            array.push(post.data())
        })
        return array
    } catch (error) {
        alert(error)
    }
}
export const fetchSumTrees = async () => {
    try {
        const doc = await firestore().collection('clubs').orderBy('trees','desc').get()

        let sum = 0
        doc.forEach((post)=>{
            let club = post.data()
            sum = sum + club.trees
        })
        return sum
    } catch (error) {
        alert(error)
    }
}