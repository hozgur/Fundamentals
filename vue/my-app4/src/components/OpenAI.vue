<template>
  <c-card>
    <c-row>
      <c-card class="col-md-9">
        <c-row>
          <h2 class="md-2">{{ engine }}</h2>
          <h5 class="text-dark">{{ method }}</h5>
        </c-row>
        <c-input v-model="prompt" @keyup.enter="OnClick" />
        <c-text>{{ answer }}</c-text>
        <c-row class="justify-content-end">
          <c-button @click="OnClick">Metni Tamamla</c-button>
        </c-row>
      </c-card>
      <c-card class="col-md-3">
        <c-slider title="Mesaj Uzunluğu:" v-model="responseLength"/>
        <c-slider title="Rastgelelik:" v-model="temp" :precision="2"/>
      </c-card>
    </c-row>
  </c-card>
</template>

<script>
import axios from "axios";

export default {
  name: "OpenAI",
  props: ["engine", "method"],
  data() {
    return {
      prompt: " ",
      answer: "answer gets here ",
      responseLength: 22,
      temp: 0.7
    };
  },
  methods: {
    sendRequest(prompt) {
      let url = `https://api.openai.com/v1/engines/${this.engine}/${this.method}`;
      console.log(url);
      let req = {
        url: url,
        timeout: 8000,
        responseType: "json",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        data: {
          prompt: prompt,
          temperature: this.temp,
          max_tokens: this.responseLength * 4,
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
        
    OnClick() {
      this.sendRequest(this.prompt);
      console.log(this.prompt);
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