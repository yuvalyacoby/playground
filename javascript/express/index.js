const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
setTimeout(() => res.sendStatus(404), 1);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})