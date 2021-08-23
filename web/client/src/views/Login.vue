<template>
  <div class="container">
    <h1>Login</h1>
    <form v-if="!loggedIn && !errorOccured" class="login-form" @submit.prevent="submitForm">
      <input name="username" type="text" v-bind="username" placeholder="Username">
      <input name="password" type="password" v-bind="password" placeholder="Passwort">
      <input class="submit-button" type="submit" value="Anmelden">
    </form>
    <div v-else-if="errorOccured" class="login-error">
      <h2>Failed to login!</h2>
      <button class="clear-error" @click="clearError">Nächster Versuch</button>
    </div>
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
    },
    clearError() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
    errorOccured() {
      return this.$store.getters.loginErrorOccured;
    }
  }
};
</script>
<style lang="scss">

form {
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin-bottom: .7rem;
    max-width: 15rem;

    &.submit-button {

    }
    
  }
}


</style>
