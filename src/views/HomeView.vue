<template>
  <div>
    <h1>Todo-Lu</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  methods: {
    ...mapActions(["initAccount"])
  },
  computed: mapGetters(["getUser"]),
  created() {
    this.initAccount();
  }
};
</script>

<style>
</style>
