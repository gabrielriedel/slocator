const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
}

connectDB();

// Get building facts by building ID (from CV model)
app.get('/building/:id', async(req, res) => {
    try{
        const db = client.db('FactDB');
        const buildings = db.collection('buildings');

        const building = await buildings.findOne({ building_id: req.params.id });

        if(!building){
            return res.status(404).json({ error: 'Building not found' });
    }

    res.json(building);
} catch(err) {
    res.status(500).json({ error: err.message });
}

});

// Get all buildings
app.get('/buildings', async (req, res) => {
    try {
      const db = client.db('FactDB');
      const buildings = db.collection('buildings');
      const all = await buildings.find({}).toArray();
      res.json(all);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
app.listen(3000, () => console.log('Server running on port 3000'));