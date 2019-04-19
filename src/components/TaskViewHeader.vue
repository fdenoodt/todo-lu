<template>
  <div>
    <div class="row">
      <h1 class="col">Tasks</h1>
      <AddTask/>
    </div>
  </div>
</template>

<script>
import AddTask from "./AddTask";

export default {
  name: "TaskViewHeader",
  components: {
    AddTask
  }
};
</script>

<style>
</style>
