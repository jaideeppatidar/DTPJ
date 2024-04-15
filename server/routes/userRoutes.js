const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sql = require('mssql');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await sql.query`
            INSERT INTO Users (email, Password)
            VALUES (${email}, ${hashedPassword})
        `;
        console.log('User registered:', result);
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/customer', async (req, res) => {
    const { name, email, phone, customerId, address } = req.body;
    try {
        const result = await sql.query`
            INSERT INTO Customers (name, email, phone, customerId, address)
            VALUES (${name}, ${email}, ${phone}, ${customerId}, ${address})
        `;
        console.log('Customer registered:', result);
        res.status(200).json({ message: 'Customer registered successfully' });
    } catch (error) {
        console.error('Error registering customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/customers', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Customers
        `;
        console.log('Customers retrieved:', result);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/customer/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const { name, email, phone, address } = req.body;
    try {
        const result = await sql.query`
            UPDATE Customers 
            SET name = ${name}, email = ${email}, phone = ${phone}, address = ${address}
            WHERE customerId = ${customerId}
        `;
        console.log('Customer updated:', result);
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/customer/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        // Your SQL query to delete the customer based on the customerId
        const result = await sql.query`
            DELETE FROM Customers
            WHERE customerId = ${customerId}
        `;
        console.log('Customer deleted:', result);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







module.exports = router;
