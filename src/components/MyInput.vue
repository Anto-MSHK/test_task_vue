<template>
  <div class="input-container">
    <p class="title">{{ title }}</p>
    <input
      type="text"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
    />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    title: String,
    modelValue: String,
    placeholder: String,
    required: Boolean,
  },
  emits: ["update:modelValue"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-container {
  display: inline-flex;
}
.title {
  margin: 0 10px 4px 0;
  font-weight: 700;
}
.input {
  /* height: 0px; */
  font-size: 16px;
  width: 100%;
}
</style>
