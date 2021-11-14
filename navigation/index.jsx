
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import TabNavigator from './TabNavigator';



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
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;