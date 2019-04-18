<template>
  <div>
    <b-nav vertical>
      <b-nav-item to="/TasksView" active>Tasks</b-nav-item>
      <b-nav-item to="/RemindersView">Reminders</b-nav-item>
      <b-nav-item to="/NotesView">Notes</b-nav-item>
      <b-nav-item @click="rip">sign out</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  methods: {
    ...mapActions(["signOut"]),
    rip() {
      this.signOut();
    }
  }
};
</script>

<style>
.hidden {
  display: none;
}
</style>
