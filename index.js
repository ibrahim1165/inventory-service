const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.ibxrp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
      await client.connect();
      const userCollection = client.db("category").collection("user");
      const laptopCollection = client.db("category").collection("laptop");
      const computerCollection = client.db("category").collection("computer");
      const producCollection = client.db("category").collection("product");

      app.get("/user", async (req, res) => {
        const users = await userCollection.find().toArray();
        res.send(users);
      });
      app.get("/user/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email: email };
        const result = await userCollection.findOne(query);
        res.send(result);
      });
      
    app.post('/product',async (req, res) => {
      const order = req.body;
      const result = await producCollection.insertOne(order);
      res.send(result);
    });

      app.get('/product', async (req, res) => {
        const query = {};
        const curser = producCollection.find(query);
        const result = await curser.toArray()
        res.send(result);
      })

      app.get('/computer', async (req, res) => {
        const query = {};
        const curser = computerCollection.find(query);
        const result = await curser.toArray()
        res.send(result);
      })
      app.get('/laptop', async (req, res) => {
        const query = {};
        const curser = laptopCollection.find(query);
        const result = await curser.toArray()
        res.send(result);
      })

      app.delete('/computer/:id',async(req,res)=>{
        const id =req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await computerCollection.deleteOne(query);
        res.send(result);
    })
      app.delete('/laptop/:id',async(req,res)=>{
        const id =req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await laptopCollection.deleteOne(query);
        res.send(result);
    })



    }
    finally{

    }
}


run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello form house!')
})
app.listen(port, () => {
    console.log(`computer house listening on port ${port}`)
  })