import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart</Text>
            <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                        <Button title="Remove" onPress={() => removeFromCart(item.id)} />
                    </View>
                )}
            />
            <Button title="Checkout" onPress={() => alert('Checkout successful!')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});

export default Cart;
