import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import useProducts from '../hooks/useProducts';
import { AppContext } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
    const [reload, setReload] = useState(false); 
    const { products, loading } = useProducts(reload); 
    const { addToCart } = useContext(AppContext);

    const handleAddProduct = () => {
        navigation.navigate('AddProduct', {
            onProductAdded: () => {
                
                setReload(!reload); 
            },
        });
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Marketplace</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.product}>
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                        <Button
                            title="Add to Cart"
                            onPress={() => addToCart(item)}
                        />
                        <Button
                            title="View Details"
                            onPress={() => navigation.navigate('ProductDetails', { product: item })}
                        />
                    </View>
                )}
            />
            <Button
                title="Add Product"
                onPress={handleAddProduct} 
            />
            <Button
                title="Cart"
                onPress={() => navigation.navigate('Cart')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    product: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default HomeScreen;
