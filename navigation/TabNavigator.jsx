import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Board from '../screens/tabs/Board';
import Map from '../screens/tabs/Map';
import { FontAwesome } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();


export default function MyTabs() {
    return (
        <Tab.Navigator
        tabBarOptions={{
            activeTintColor:'#17458f',
            inactiveTintColor:"grey",
            showLabel:false,
            style:{
                height:70,
                borderTopRightRadius:30,
                borderTopLeftRadius:30,
                
            }
        }}
        >
            <Tab.Screen name="Map" component={Map} 
                options={{
                    
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="map" color={color} size={25} />
                    ),
                }}
            />
            <Tab.Screen name="Board" component={Board} options={{
                    
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={25} />
                    ),
            }} />
            
        </Tab.Navigator>
    );
}