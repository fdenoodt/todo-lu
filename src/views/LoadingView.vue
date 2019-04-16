<template>
  <div>
    <h1>Todo-Lu</h1>
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoadingView",
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
