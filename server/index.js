require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 80;

const app = express();
const start = async () => {
    app.listen(PORT, () => console.log(`Server started. Listening to port ${PORT}.`));
}

start();