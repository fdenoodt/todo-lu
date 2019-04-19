<template>
  <div class="col text-right m-2">
    <button @click="addTask" type="button" class="btn btn-primary">+</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddTask",
  methods: {
    ...mapActions(["addTask"])
  }
};
</script>

<style>
</style>
