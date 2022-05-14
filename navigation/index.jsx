
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import Plant from '../screens/Plant.jsx'
import TreeImage from '../screens/TreeImage';
import NewClub from '../screens/NewClub';


const Stack = createStackNavigator();



function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}  
                options={{
                    headerShown:false
                }}/>
                <Stack.Screen name="TabNavigator" component={TabNavigator}
                options={{
                    headerShown:false
                }}
                />
                <Stack.Screen name="Plant" component={Plant}
                options={{
                    headerShown:false
                }}
                />
                <Stack.Screen name="TreeImage" component={TreeImage}
                options={{
                    headerShown:false
                }}
                />
                <Stack.Screen name="NewClub" component={NewClub}
                options={{
                    headerShown:false
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;