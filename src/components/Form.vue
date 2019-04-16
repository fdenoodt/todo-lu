<template>
  <div>
    <b-input v-bind:value="email" v-model="email"/>
    <b-input v-bind:value="password" v-model="password"/>
    <b-button @click="$emit('form-submit', email, password)">Submit</b-button>
  </div>
</template>

<script>
export default {
  name: "Form",
  components: {},
  data() {
    return {
      email: "em",
      password: "pw"
    };
  }
};
</script>

<style>
</style>
