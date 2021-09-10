<template>
  <div v-if="loggedIn" id="app-wrapper">
    <div v-for="e in errors" :key="e" id="error-banner">{{e}}</div>
    <Loading v-if="isLoading"></Loading>
    <Success v-if="operationSuccess"></Success>
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>

    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/boulder">Boulder</router-link>
      <router-link to="/profil">Profil</router-link>
    </div>
  </div>
  <div v-else id="app-wrapper">
    <Loading v-if="isLoading"></Loading>
    <Success v-if="operationSuccess"></Success>
    <Login></Login>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Loading from "@/components/Loading.vue";
import Success from "@/components/Success.vue";

export default {
  components: {
    Login,
    Loading,
    Success,
  },
  data() {
    return {
      errors: []
    };
  },
  methods: {
    
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    isLoading() {
      return this.$store.getters["isLoading"];
    },
    operationSuccess() {
      return this.$store.getters["operationSuccess"];
    }
  },
  
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

body {
  margin: 0;
  background-color: $font;
}

a {
  text-decoration: none;
  color: $font;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font;
}

#nav {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: $max_width;
  align-items: center;
  justify-content: space-evenly;
  background-color: $other;
  padding-top: 10px;
  margin-top: 10px;
  box-shadow: 0 0 5px $background;

  &::before {
    content: "";
    height: 10px;
    width: 100%;
    background-color: $background;
    position: absolute;
    top: 0;
    left: 0;
    
  }

  a {
    font-weight: bold;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: 0px 0px 3px 3px;

    &.router-link-active {
      color: $primary;
      border-bottom: none;
      background-color: $background;
      box-shadow: 0 0px 2px $background;
    }
  }
}

.fade {
  animation: fade 1.5s linear;

  @keyframes fade {
    0%,100% { opacity: 0; }
    20%,80% { opacity: 1; }
  }
}


.container {
  max-width: 960px;
  margin: auto;
  margin-bottom: 2rem;
  padding: 10px 15px;
  background-color: $background;
  position: relative;
  min-height: calc(100vh - 55px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
