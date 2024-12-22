// ExpenseListScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { db } from './firebaseConfig';  // Firebase setup
import { collection, getDocs } from 'firebase/firestore';  // Firestore

export default function ExpenseListScreen() {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.amount}>MYR {item.amount}</Text>
            {item.receiptUrl && <Image source={{ uri: item.receiptUrl }} style={styles.receiptImage} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  expenseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: '#333',
  },
  receiptImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
