import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AddProduct = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleAddProduct = async () => {
        try {
            const response = await fetch('http://192.168.1.12:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: parseFloat(price),
                    stock: parseInt(stock, 10),
                }),
            });
    
            // Check if the response is JSON
            const text = await response.text(); // Get the raw response body
            let data;
            try {
                data = JSON.parse(text); // Try to parse the response as JSON
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                console.log('Response body:', text); // Log the raw response for debugging
                Alert.alert('Error', 'Invalid server response');
                return;
            }
    
            if (response.ok) {
                Alert.alert('Success', data.message);
                navigation.goBack();
            } else {
                Alert.alert('Error', data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error with request:', error); // Log any unexpected errors
            Alert.alert('Error', 'Failed to add product');
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Product</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
            />
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});

export default AddProduct;
