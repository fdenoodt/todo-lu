<template>
  <b-input v-bind:value="content" v-model="content"/>
</template>

<script>

export default {
  name: "InputField",
  props: ["content"]
};
</script>

<style>
</style>
