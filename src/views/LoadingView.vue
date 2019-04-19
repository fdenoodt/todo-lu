<template>
  <div>
    <h1>Todo-Lu</h1>
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoadingView",
  computed: mapGetters(["getUser"])
};
</script>

<style>
</style>
