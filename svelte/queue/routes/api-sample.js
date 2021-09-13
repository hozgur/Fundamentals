const express = require('express');

const router = express.Router();

const data = require('../sample-data.json')

const errorMessages = {
  ERR_NO_DATA: 'veri gönderilmesi gerekli.'
}
// /api olarak yapılan çağrımlarda kullanılan get ve post metodları
router.get("/", (req,res) => {

    // data verisini json olarak göndermek için.
    res.json(data);
});

router.get("/jobs", (req,res) => {

  // data verisini json olarak göndermek için.
  res.json(data);
});

// post 
// curl -X POST -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://localhost:5000/api
router.post("/", (req,res) => {
  
  // post kullanıyorsak 
  if(req.body)
  {
    res.json(req.body);
  }
  else
  {
    res.status(400).send(errorMessages.ERR_NO_DATA)
  }
});

// api/param1/param2 şeklindeki çağrıma cevap vermek için 
// curl -X POST -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://localhost:5000/api/param1/param2
router.post("/:param1/:param2", (req,res) => {
  
  console.log("Param 1 :",req.params.param1);
  console.log("Param 2 :",req.params.param2);
  // post kullanıyorsak 
  if(req.body)
  {
    res.json({
      "param1": req.params.param1,
      "param2": req.params.param2,
      "body": req.body
    });
  }
  else
  {
    res.status(400).send(errorMessages.ERR_NO_DATA)
  }
});

// urlencoded ile veri alma örneği:
// Örnek Çağrım: http://localhost:5000/api/querytest?param1=value1&param2=value2
router.get("/querytest", (req,res) => {
  
  console.log("Param 1 :",req.query.param1);
  console.log("Param 2 :",req.query.param2);
  
  res.json({"param1": req.query.param1, "param2": req.query.param2});
  
});

module.exports = router;
