// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // For navigation
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from './firebaseConfig';  // Firebase setup
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Firebase Storage
import { collection, addDoc } from 'firebase/firestore';  // Firestore
import { Picker } from '@react-native-picker/picker';  // Picker component


export default function HomeScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();  // Navigation hook

  // Request permission for camera when the app loads
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'We need permission to access your camera!');
      }
    };
    getPermission();
  }, []);

  // Function to take a picture using the camera
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setReceipt(imageUri);
    }
  };

  const saveExpense = async () => {
    if (!description || !amount || !receipt) {
      Alert.alert('Please fill all fields correctly and take a picture for the receipt.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(receipt);
      const blob = await response.blob();
      const storageRef = ref(storage, `receipts/${Date.now()}_receipt.jpg`);
      const uploadTask = await uploadBytes(storageRef, blob);

      const receiptUrl = await getDownloadURL(uploadTask.ref);

      const expenseRef = await addDoc(collection(db, 'expenses'), {
        description: description,
        amount: parseFloat(amount),
        receiptUrl: receiptUrl,
      });

      setLoading(false);
      Alert.alert('Expense saved successfully!');
      setDescription('');
      setAmount('');
      setReceipt(null);
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed to save expense.');
    }
  };

  return (
    <View style={styles.container}>

      <Image source={require('./assets/3d-wallet.png')} style={styles.icon} />
      <Text style={styles.title}>Expense Tracker</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <Picker
          selectedValue={description}
          style={styles.picker}
          onValueChange={(itemValue) => setDescription(itemValue)}
        >
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="Transport" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Bills" value="Bills" />
          <Picker.Item label="Shoppings" value="Shoppings" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount : MYR"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.receiptContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text style={styles.buttonText}>Take Receipt Picture</Text>
        </TouchableOpacity>

        {receipt && <Image source={{ uri: receipt }} style={styles.receiptImage} />}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
      ) : (
        <TouchableOpacity onPress={saveExpense} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Expense</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('Expense List')}  // Navigate to the expense list page
        style={styles.viewButton}
      >
        <Text style={styles.viewButtonText}>View Expenses</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Align content to the top
    alignItems: 'center',  // Horizontally center content
    padding: 20,
    backgroundColor: '#f1f7ed',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,  // Increased margin for more spacing from the top
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center', // Center the icon
    marginBottom: 10, // Space between the icon and title
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',  // Make sure inputs take full width available
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    width: '100%',  // Make input take full width of container
  },
  receiptContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  receiptImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  viewButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  loader: {
    marginTop: 30,
  },
});
