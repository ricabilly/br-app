<template>
  <div class="container">
    <h1>Profil</h1>
    <div class="profil">
      <h2>Hallo {{user.firstname}}!</h2>
      <button class="logout" @click="logout">Abmelden</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Profil",
  data() {
    return {
      
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
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



</style>
