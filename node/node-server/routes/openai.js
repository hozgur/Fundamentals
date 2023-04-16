const express = require('express');

const router = express.Router();

const data = require('../data.json')

const axios = require('axios');


router.get("/", (req,res) => {
    res.json(data);
});

async function sendRequest(options) {
    let req = {
      url: `https://api.openai.com/v1/engines/${options.engine}/${options.method}`,
      timeout: 9000,
      responseType: "json",
      headers: {
        Authorization:
          "Bearer api code here
          ",
        "Content-Type": "application/json",
      },
      data: {
        prompt: options.prompt,
        temperature: options.temp || 0.7,
        max_tokens: options.responseLength || 30,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: ["\n"],
      },
      method: "post",
    };
    console.log(req.data);
    const post = await axios(req);    
    return post;    
  }

async function send(req,res) {

    if(req.body)
    {   
        console.log(req.params.engine);
        console.log(req.params.method);
        try {
          const response = await sendRequest({
            engine: req.params.engine,
            method: req.params.method,
            prompt: req.body.prompt,
            temp: req.body.temp,
            responseLength: req.body.max_tokens
          });
          res.json(response.data);  
        } catch (error) {
          res.json({msg:`error on request! ${error}`});  
        }
        
    }
    else    
        res.json({msg:"hello!"});
};


router.post("/:engine/:method", (req,res) => {
    
  send(req,res);
});

module.exports = router;
