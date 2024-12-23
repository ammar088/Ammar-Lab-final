import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/Home';
import ProductDetails from './Screens/ProductDetails';
import Cart from './Screens/Cart';

import { AppProvider } from './context/AppContext';
import AddProduct from './Screens/AddProduct';

const Stack = createStackNavigator();

const App = () => {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="ProductDetails" component={ProductDetails} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="AddProduct" component={AddProduct} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
};

export default App;
