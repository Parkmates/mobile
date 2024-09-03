import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='TabNavigator' component={TabNavigator} options={{ headerShown: false }}/>
        {/* <Stack.Screen name='Profile' component={ProfilePage} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})