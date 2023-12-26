import express from 'express';
import { json } from 'body-parser';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

// Set up PostgreSQL connection
const pool = new Pool({
    user: 'default',
    host: 'ep-lucky-wave-05965776-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'vrCdOBNlyA46',
    port: 5432,
});

app.use(json());

// Define the registration endpoint
app.post('app/register', async (req, res) => {
    try {
        const { username, password, } = req.body;

        // Insert user into the database
        const result = await pool.query(
            'INSERT INTO Users (name, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );

        const newUser = result.rows[0];

        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});