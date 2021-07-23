<template>
  <c-row class="d-flex justify-content-between align-items-center">
    <label :for="id" class="form-label-sm">{{ title }}</label>
    <c-input
      style="
        width: 48px;
        height: 24px;
        font-size: 14px;
        float: right;
        border: 0;
        text-align: right;
        padding-right: 0px;
      "
      :value="modelValue"
      @input="$emit('update:modelValue', e.target.value)"
    />
  </c-row>
  <c-row>
    <input
      type="range"
      class="form-range"
      :id="id"
      :min="min"
      :max="max"
      :step="step"
      :value="sliderValue"
      @change="OnChangeSlider"
      @input="OnChangeSlider"
    />
  </c-row>
</template>

<script>
export default {
  name: "Slider",  
    props: {
        title :        String,
        min:           Number,
        max:           Number,
        id:            String,
        step:          Number,
        modelValue:    Number,
        precision: {
            type: Number,
            default:0,
            validator(value) {
                return value >=0 && value < 4;
            }
        } 
    },
   emits:['update:modelValue'],
  computed: {
    sliderValue() {
      return this.modelValue * 10 ** this.precision;
    },
  },  
  methods: {    
    OnChangeSlider(e) {
      this.value = e.target.value / 10 ** this.precision;
      this.$emit('update:modelValue', this.value);
    },
  },
};
</script>