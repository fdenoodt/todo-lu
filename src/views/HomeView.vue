<template>
  <div>
    <h1>Todo-Lu</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  methods: {},
  computed: mapGetters(["getUser"]),
  created() {
  }
};
</script>

<style>
</style>
