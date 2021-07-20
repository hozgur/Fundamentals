<template>
  <c-card>
    <c-hstack>
      <h2 class="md-2">{{ openaiEngine }}</h2>
      <h5 class="text-dark">{{ openaiMethod }}</h5>
    </c-hstack>
    <c-input v-model="prompt" @keypress="OnKeyPress" />
    <c-text>{{ answer }}</c-text>
    <c-button @click="OnClick">Ask !</c-button>
  </c-card>
</template>

<script>
import axios from "axios";
import options from "../openai.options.json";
export default {
  name: "OpenAI",
  props: ["openaiEngine", "openaiMethod"],
  data() {
    return {
      prompt: " ",
      answer: "answer gets here ",
      options: options,
    };
  },
  methods: {
    sendRequest(prompt) {
      let req = {
        url: "https://api.openai.com/v1/engines/davinci/completions",
        timeout: 8000,
        responseType: "json",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        data: {
          prompt: prompt,
          temperature: 0.9,
          max_tokens: 160,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
          stop: ["\n"],
        },
        method: "post",
      };
      this.answer = "waiting...";
      axios(req).catch(this.OnError).then(this.OnResponse);
    },
    mount() {},
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    OnClick(event) {
      this.sendRequest(this.prompt);
    },
    OnKeyPress(event) {
      if (event.keyCode == 13) {
        this.sendRequest(this.prompt);
      }
    },
    OnResponse(response) {
      console.log("Response = ", response);
      this.answer = response.data.choices[0].text;
    },
    OnError(error) {
      console.log("Error = ", error);
      this.answer = error.message;
    },
  },
};
</script>