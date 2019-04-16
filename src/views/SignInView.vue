<template>
  <div>
    <h1>Sign in</h1>
    <Form v-on:form-submit="submit"></Form>
    <p>
      <router-link to="/RegisterView">Register</router-link>
    </p>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "SignInView",
  methods: {
    ...mapActions(["signIn"]),
    submit(email, password) {
      this.signIn({ email, password });
    }
  },
  created() {}
};
</script>
