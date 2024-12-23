import { useEffect, useState } from 'react';

const useProducts = (reload) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://192.168.1.12:5000/products');

                if (response.ok) {
                    const data = await response.json(); 
                    setProducts(data); 
                } else {
                    console.error('Failed to fetch products:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts();
    }, [reload]); 

    return { products, loading };
};

export default useProducts;
