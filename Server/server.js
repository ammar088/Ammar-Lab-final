const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./private-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();
app.get('/products', async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.post('/products', async (req, res) => {
    try {
        const { name, description, price, image, stock } = req.body;
        const productRef = await db.collection('products').add({
            name,
            description,
            price,
            stock,
        });
        res.json({ id: productRef.id, message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().getUserByEmail(email);
        res.json(user);
    } catch (error) {
        res.status(404).send('User not found.');
    }
});
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server connected successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
