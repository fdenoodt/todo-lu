<template>
  <div>
    <div>
      <TaskViewHeader/>
    </div>
    <div>
      <Tasks/>
    </div>
  </div>
</template>

<script>
import Tasks from "../components/Tasks";
import TaskViewHeader from "../components/TaskViewHeader";

export default {
  name: "TaskView",
  components: {
    Tasks,
    TaskViewHeader
  }
};
</script>

<style>
</style>
