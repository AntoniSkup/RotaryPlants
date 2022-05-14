import storage from '@react-native-firebase/storage';

import * as ImageManipulator from 'expo-image-manipulator';
import uuid from "uuid";

export const uploadPhoto = (image)=> {
    try {
        return async (dispatch)=>{
            var metadata ={
                cacheControl: 'public, max-age=5000, s-maxage=600',
            }
            let fileType = image.uri.split("/");
            let length = fileType.length -1;
            fileType= fileType[length].split(".")[1]
            
            const resize = await ImageManipulator.manipulateAsync(image.uri, [],{
                format: ImageManipulator.SaveFormat[fileType === "jpeg" || "jpg" ? "JPEG" : "PNG"],             
                compress: 0.5,
                base64: false,
            })      
            const response = await fetch(resize.uri)
            const blob = response.blob()
    
            const uploadTask = await storage()
            .ref()
            .child(`${uuid.v4()}`)
            .put(blob, metadata)
    
            const downloadURL = await uploadTask.ref.getDownloadURL()
            alert("GELlo")
            return downloadURL
        }
    } catch (error) {
        alert(error)
    }
    
}