<template>
  <div class="container">
    <h1>Login</h1>
    <form v-if="!loggedIn && !errorOccured" class="login-form" @submit.prevent="submitForm">
      <input name="username" type="text" v-model="username" placeholder="Username">
      <input name="password" type="password" v-model="password" placeholder="Passwort">
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
      if(this.username == "" || this.password == "") {
        alert("Bitte Username und Passwort angeben!");
        return
      }
      this.$store.dispatch("user/login", { username: this.username, password: this.password});
    },
    clearError() {
      this.$store.dispatch("user/clearError");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    user() {
      return this.$store.getters["user/getUser"];
    },
    errorOccured() {
      return this.$store.getters["user/errorOccured"];
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
