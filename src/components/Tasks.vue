<template>
  <div>
    <div v-bind:key="task.id" v-for="task in getTasks">
      <TaskItem v-bind:task="task"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskItem from "./TaskItem.vue";

export default {
  name: "Tasks",
  components: {
    TaskItem
  },
  computed: {
    ...mapGetters(["getTasks"])
  }
};
</script>

<style scoped>

</style>
