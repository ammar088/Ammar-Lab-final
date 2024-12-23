import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProductDetails = ({ route, navigation }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{product.name}</Text>
            <Text>${product.price}</Text>
            <Text>{product.description}</Text>
            <Button title="Add to Cart" onPress={() => navigation.navigate('Cart', { product })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default ProductDetails;
