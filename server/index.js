require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose').default;

const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middlewere');

const upload = multer();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(upload.array('images'));
app.use(express.static('public'));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log("server is working"));
    } catch (e) {
        console.log(e);
    }
}

void start();
