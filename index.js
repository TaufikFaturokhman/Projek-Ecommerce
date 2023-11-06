require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})