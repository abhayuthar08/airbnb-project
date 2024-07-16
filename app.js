const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to db");
})
.catch((err)  => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get('/' , (req , res) => {
    res.send("working")
})

app.listen(8080 , () => {
    console.log('Server started on port 8080');
})