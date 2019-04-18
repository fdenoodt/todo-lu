<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <div v-bind:class="{'hidden':getUser == null}">
          <b-col cols="12" md="auto">
            <Sidebar/>
          </b-col>
        </div>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import { mapGetters } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapGetters(["getUser"])
  },
  components: { Sidebar }
};
</script>

<style>
#app {
  padding: 0;
  margin: 0;
}
</style>
