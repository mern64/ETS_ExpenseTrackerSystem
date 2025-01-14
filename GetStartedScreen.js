import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GetStartedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Image on top */}
      <Image
        source={require('./assets/ExpenseSave.png')}  // Your image file path
        style={styles.image}
      />

      <Text style={styles.title}>Welcome to Expense Tracker</Text>
      <Text style={styles.subtitle}>Track your daily expenses with ease</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Expense Tracker')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f1f7ed',  // Optional background color
  },
  image: {
    width: 300,  // Adjust the size as needed
    height: 300, // Adjust the size as needed
    marginBottom: 20,  // Space between image and title

    
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#7ca982',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,  // Make the button rounder by increasing the borderRadius
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow offset
    shadowOpacity: 0.3,  // Shadow opacity
    shadowRadius: 5,  // Shadow blur radius

    // Shadow for Android (elevation)
    elevation: 5,  // Controls shadow on Android

    
  },
  buttonText: {
    color: '#black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
