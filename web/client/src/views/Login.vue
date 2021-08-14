<template>
  <div class="login">
    <form v-if="!loggedIn" class="login-form" @submit.prevent="submitForm">
      <input name="username" type="text" v-bind="username" placeholder="Username">
      <input name="password" type="password" v-bind="password">
      <input type="submit" value="Anmelden">
    </form>
    <div v-else class="login-success">
      <h2>Hallo {{user.name}}!</h2>
      <button class="logout" @click="logout">Abmelden</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch("login", this.username, this.password);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
<style lang="scss"></style>
