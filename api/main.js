import mysql from "./crowdfunding_db.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// Use import.meta.url to obtain the path of the current file and parse it into __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configuration page
app.use(express.static(path.join(__dirname, '../client')));

// Data handling
async function dataHandler(FUNDRAISER) {
    if (FUNDRAISER.length) {
        const [CATEGORY] = await mysql.query('SELECT * FROM CATEGORY');
        return FUNDRAISER.map(item => {
            const category = CATEGORY.find(c => c.CATEGORY_ID === item.CATEGORY_ID);
            item['CATEGORY_NAME'] = category ? category.NAME : null;  // Extract and assign category names
            return item;
        });
    }
    return FUNDRAISER;
}


// List
app.get("/fundraisers", async (req, res) => {
    try {
        const [data] = await mysql.query('SELECT * FROM FUNDRAISER');
        const processedData = await dataHandler(data);
        res.status(200).send(processedData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Classification
app.get("/categories", async (req, res) => {
    try {
        const [data] = await mysql.query("SELECT * FROM CATEGORY");
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Search
app.get("/search", async (req, res) => {
    const { organizer, city, category } = req.query;
    let sql = ''
    if (organizer) {
        sql += sql ? 'AND' : 'WHERE' + ` ORGANIZER = '${organizer}'`
    }
    if (city) {
        sql += sql ? 'AND' : 'WHERE' + ` CITY = '${city}'`
    }
    if (category) {
        sql += sql ? 'AND' : 'WHERE' + ` CATEGORY_ID = ${category}`
    }
    try {
        const [data] = await mysql.query(`SELECT * FROM FUNDRAISER ` + sql);
        const processedData = await dataHandler(data);
        res.status(200).send(processedData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Get Details
app.get("/fundraiser/:id", async (req, res) => {
    try {
        const [data] = await mysql.query(`SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?`, [req.params.id]);
        const processedData = await dataHandler(data);
        res.status(200).send(processedData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Start
app.listen(3000, () => {
    console.log(`http://localhost:3000/index.html`);
});
