<template>
  <div>
    Create an account
    <Form v-on:form-submit="submit"></Form>
    <p>
      <router-link to="/SignInView">Sign in</router-link>
    </p>
  </div>
</template>

<script>
import Form from "../components/Form";
import { mapActions } from "vuex";

export default {
  name: "RegisterView",
  components: {
    Form
  },
  methods: {
    ...mapActions(["register"]),
    submit(email, password) {
      this.register({ email, password });
    }
  }
};
</script>
