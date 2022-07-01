const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://saif-abrar:x3XZo2T33Edf3N5z@cluster0.erehg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const dataCollection = client.db("task-manager").collection("tasks")
       

        //POST
        app.post('/allTasks', async (req, res) => {
            const newTask = req.body;
            const result = await dataCollection.insertOne(newTask);
            res.send(result);
        });

        //GET
        app.get('/allTasks', async (req, res) => {
            const query = {};
            const cursor = dataCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })
    }
    finally {

    }
}

run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running server');
});

app.listen(port, () => {
    console.log('Server is runnning');
})