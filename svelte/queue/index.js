const express = require('express');
const app = express();

// url encoded olarak gelen veriyi almak için
app.use(express.urlencoded({ extended: true }));
// json olarak gelen body data'sını almak için
app.use(express.json());

const path = require('path')
console.log(path.join(__dirname, '../queue-ui/public'))
// Statik Dosyaları paylaşmak için 
app.use(express.static('queue-ui/public'))

// Farklı istekleri ayrı dosyalarda yönetmek için rooter kullanımı.
app.use('/api',require("./routes/api-sample"));

// Çağrımlara verilen örnekler api-sample.js dosyasında.

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
})