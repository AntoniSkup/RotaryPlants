import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation  from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Firebase from "@react-native-firebase/app"
import { LogBox } from 'react-native'
import { Platform } from 'react-native';

LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {

  React.useEffect(() => {
    if (Platform.OS === 'ios' ) {
      Firebase.initializeApp(this)
    }else {
      if (!Firebase.apps.length) {
        Firebase.initializeApp(this)
      }else {
          Firebase.app(); // if already initialized, use that one
      }
    }
  }, []);
  

  return (
    <SafeAreaProvider >
      <Navigation/>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
