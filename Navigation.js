// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Homescreen';  // The screen where you save expenses
import ExpenseListScreen from './ExpenseList';  // The screen to view saved expenses

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Expense List" component={ExpenseListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
