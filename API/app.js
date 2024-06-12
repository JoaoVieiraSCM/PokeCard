const express = require('express')
const app = express()
const port = 3030

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/API_Test.html')
})

app.listen(port, () => {
  console.log(`Página rodando em: localhost:${port}`)
})
