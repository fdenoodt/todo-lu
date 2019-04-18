<template>
  <div>
    <b-nav vertical>
      <b-nav-item active>Tasks</b-nav-item>
      <b-nav-item>Reminders</b-nav-item>
      <b-nav-item>Notes</b-nav-item>
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
