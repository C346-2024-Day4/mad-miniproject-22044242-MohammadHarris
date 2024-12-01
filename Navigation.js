import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Registration from './screens/Registration';
import Client from './screens/Client';
import Setting from './screens/Setting';
import Alarm from './screens/Alarm';

function Navigation() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='registration' component={Registration}/>
                <Stack.Screen name='client' component={Client}/>
                <Stack.Screen name='setting' component={Setting}/>
                <Stack.Screen name='alarm' component={Alarm}/>
            </Stack.Navigator>
        </NavigationContainer> 
  )
}

export default Navigation