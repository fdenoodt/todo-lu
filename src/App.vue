<template>
  <div id="app">
    <nav v-bind:class="{'hidden':getUser == null}">
      <ul>
        <li>
          <b-button @click="rip">sign out</b-button>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  components: {},
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    ...mapActions(["signOut"]),
    rip() {
      this.signOut();
    }
  }
};
</script>

<style>
#app {
}

.hidden {
  display: none;
}
</style>
