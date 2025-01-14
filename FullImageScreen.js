import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function FullImageScreen({ route }) {
  const { imageUrl } = route.params;  // Retrieve the imageUrl from the params

  return (
    <View style={styles.container}>
      {/* Header without back button */}


      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.fullImage} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e', // Dark background
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,  // For status bar on most devices
    backgroundColor: '#1c1c1c',  // Darker header
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(180deg, rgba(34,34,34,1) 0%, rgba(20,20,20,1) 100%)',  // Gradient effect
  },
  fullImage: {
    width: '90%',  // Slightly smaller for padding
    height: '80%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,  // Shadow effect on Android
  },
});
