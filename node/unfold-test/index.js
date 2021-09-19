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