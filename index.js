require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000
const app = express();
const router = require('./routers/index')

app.use(express.json());

app.use('/api/v1',router)

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})