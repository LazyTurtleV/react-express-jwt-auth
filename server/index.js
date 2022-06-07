require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
    app.listen(PORT, () => console.log(`Server started. Listening to port ${PORT}.`));
}

start();