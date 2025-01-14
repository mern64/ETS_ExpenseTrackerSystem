// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Homescreen';  // The screen where you save expenses
import ExpenseListScreen from './ExpenseList';  // The screen to view saved expenses
import FullImageScreen from './FullImageScreen';  // Import FullImageScreen
import GetStartedScreen from './GetStartedScreen';  // Import GetStartedScreen



const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Get Started">
        {/* Get Started Screen */}
        <Stack.Screen name="Get Started" component={GetStartedScreen} options={{ headerShown: false }}/>
      
        <Stack.Screen name="Expense Tracker" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Expense List" component={ExpenseListScreen} options={{ title: 'Back' }} />
        <Stack.Screen name="FullImage" component={FullImageScreen} options={{ title: 'Full Receipt' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
