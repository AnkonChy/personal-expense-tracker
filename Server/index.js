require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ri84s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const expenseCollection = client
    .db("personal-expense-tracker")
    .collection("expense");

  //add expense
  app.post("/expenses", async (req, res) => {
    const data = req.body;
    const result = await expenseCollection.insertOne(data);
    res.send(result);
  });

  //all expense
  app.get("/expenses", async (req, res) => {
    const result = await expenseCollection.find().toArray();
    res.send(result);
  });

  //delete expense
  app.delete("/expenses/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await expenseCollection.deleteOne(query);
    res.send(result);
  });
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
