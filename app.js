const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("HELLO FROM YELP CAMP!")
})

app.listen(3000, () => {
    console.log("SERVING ON PORT 3000")
})