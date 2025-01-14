import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig';  // Firebase setup
import { collection, getDocs } from 'firebase/firestore';  // Firestore
import { useNavigation } from '@react-navigation/native';  // For navigation

export default function ExpenseListScreen() {
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();  // Navigation hook

  useEffect(() => {
    const fetchExpenses = async () => {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      const expenseList = [];
      querySnapshot.forEach((doc) => {
        expenseList.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expenseList);
    };
    fetchExpenses();
  }, []);

  // Navigate to the full image view
  const viewFullImage = (receiptUrl) => {
    navigation.navigate('FullImage', { imageUrl: receiptUrl });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View style={styles.textContainer}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.amount}>MYR {item.amount}</Text>
            </View>

            {item.receiptUrl && (
              <TouchableOpacity onPress={() => viewFullImage(item.receiptUrl)}>
                <Image source={{ uri: item.receiptUrl }} style={styles.receiptImage} />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  expenseItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: '#555',
  },
  amount: {
    fontSize: 14,
    color: '#888',
  },
  receiptImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});
