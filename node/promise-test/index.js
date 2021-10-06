/*
from : https://www.w3schools.com/js/js_async.asp

"async and await make promises easier to write"

async makes a function return a Promise

await makes a function wait for a Promise

*/
const axios = require('axios');


async function sendRURequest() {
    try {
      console.log("wait for me!");
      const post = await axios("https://randomuser.me/api/");
      let name = post.data.results[0].name;
      console.log("log from after promise :",name);

      // for test exception mechanism, uncomment below 2 lines
      //console.log("now sending exception.");
      //throw new Error("Test Error");

      return name;
  
    } catch (error) {
      console.log("error on catch close:", error);
      return "this is error string returning on catch close";
    }
  }
  
  async function sendDelayedRequest() {
    try {
      console.log("wait for me!");
      // server from tools/templates/node/simple-express
      const post = await axios("http://localhost:3000?timeout=1000");
      let return_message = post.data;
      console.log("log from after promise :",return_message);

      // for test exception mechanism, uncomment below 2 lines
      //console.log("now sending exception.");
      //throw new Error("Test Error");

      return return_message;
  
    } catch (error) {
      console.log("error on catch close:", error);
      return "this is error string returning on catch close";
    }
  }

  function send() {
    console.log("send");
    sendDelayedRequest().then((value) => {
      console.log("return value from promise : (on then function) ",value);
      sent = true;
    });
  };
var sent = false;
console.log("Before");
send();
console.log("After");
let count = 0;
let interval = setInterval(() => {
  console.log(`waiting for result from send for .${count++} seconds.`);
  if(count > 10) {
    console.log("that's enough for waiting.. I'm timeout")
    clearInterval(interval);
  }else
  if (sent) {
    console.log("send is done.");
    clearInterval(interval);
  }
}, 100);

