const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

//if cors is not wokring then this
// const corsOptions = {
//     origin: (origin, callback) => {
//         callback(null, true);
//     },
//     methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
//     credentials: true,
// };

// else this one
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","DELETE","PUT","PATCH"],
    credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.use('/', routes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});
