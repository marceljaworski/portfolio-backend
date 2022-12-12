const express = require("express");

import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express()

const port = process.env.PORT;

server.use(express.json())

server.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})




server.use("/", express.static("./files/frontend"));
server.get("/*", (req, res) => res.sendFile(__dirname + "/files/frontend/index.html"));


server.use((req, res) => {
    res.status(404).send("Diese Seite gibt es nicht :(")
})


server.use((err, req, res, next) => {
    console.log("Ein Fehler ist aufgetreten", err)
    res.status(500).send("Es liegt nicht an dir sondern an mir...")
})

server.listen(port, () => {
    console.log("Server is running on " + port)
})
