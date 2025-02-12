const cors = require("cors")
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

// Connect DB
connectDB()

const app = express();

// Allow frontend access
app.use(cors({origin:"https://benzoll-frontend.onrender.com"}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', userRoutes)
app.use('/api/tickets', ticketRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Support Deck APIs" });
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}` ))





