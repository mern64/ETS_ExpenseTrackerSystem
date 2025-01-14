import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GetStartedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
  

      <Image source={require('./assets/ExpenseSave.png')} style={styles.image} />

      <Text style={styles.title}>Welcome to Expense Tracker</Text>
      <Text style={styles.subtitle}>
        Keep track of your expenses and manage your budget with ease.
      </Text>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('Expense Tracker')}
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#022b3a',
    paddingHorizontal: 20,
    paddingTop: 50,  // To leave space for the status bar
  },
  image: {
    width: '100%',
    height: 300, // Adjust this based on the aspect ratio of your image
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 10,
  },
  getStartedButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,  // To give some space at the bottom of the screen
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
