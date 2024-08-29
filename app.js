const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 


const validateName = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    next();
};


app.get('/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching items' });
    }
});

app.post('/create', validateName, async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating item' });
    }
});


app.put('/update/:id', validateName, async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const result = await pool.query('UPDATE items SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating item' });
    }
});


app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted', item: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting item' });
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

