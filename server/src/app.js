const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');



const app = express();

app.use(cors());//allow fetch/ axios request from any domin
app.use(express.json())

dotenv.config();
console.log("Environment variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);


// connect db
mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('DB Connected')) 
        .catch(error => console.log(`Unable to connect: ${error}`)) 

        console.log(process.env.MONGODB_URI);


// middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

app.use(express.json());

app.get('/',(req,res) => {
  res.send('Hello from the dashboard app')
})



app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;