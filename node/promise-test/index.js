const axios = require('axios');

async function sendOpenAIRequest(prompt) {
  let req = {
    url: `https://api.openai.com/v1/engines/davinci/completions`,
    timeout: 9000,
    responseType: "json",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    data: {
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 30,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ["\n"],
    },
    method: "post",
  };
  const post = await axios(req);
  console.log(post.body);
}

async function sendRURequest() {
  try {
    const post = await axios("https://randomuser.me/api/");
    let name = post.data.results[0].name;
    console.log(name);
    return name;

  } catch (error) {
    console.log("error:", error);
    return "error";
  }
}

function send() {
  let prompt = "Adamin biri helva yemiş.";
  sendRURequest().then((value) => {
    console.log(name);
  });
  console.log("After");
};

//send();

//try unfold

let data1 = {
  prompt: "test",
  temp: 12,
  responseLength: 13
};


function unfoldfunc(val) {

  console.log(val);
  let data2 = {
    val,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: ["\n"], 
  }

  
  console.log(data2);
};

console.log("test");
unfoldfunc(...data1);