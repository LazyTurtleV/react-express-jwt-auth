require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./Middleware/error-handler');

const router = require('./Router/index');
const DB = require('./Models/DB');

const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    app.listen(PORT, async () => {
        console.log(`Server started. Listening to port ${PORT}.`)
        await DB.init();
    });
}

start();