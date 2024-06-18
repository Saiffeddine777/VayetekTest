const express = require("express")
const cors = require("cors")
require("dotenv").config()

const Games = require ("./Routes/Games")
const chat = require("./socket.io/chat")
const http = require("http")
const socketIo = require("socket.io")

const  app= express()
const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"], 
    credentials: true
  }
});

const port = 4000;
app.use(express.json())
app.use(cors())
app.use("/api/games", Games)

io.on('connection',(socket)=>{
    chat(io,socket)
})

server.listen(port , ()=>{
    console.log(`Application listening on ${port}`)
})
