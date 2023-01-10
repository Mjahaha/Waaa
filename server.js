const express = require('express');
const app = express();

const PORT = process.env.PORT || 1001;

app.listen(PORT, () => {
    console.log('The server for complaing your life away has begun..');
});