<template>
  <div id="app-wrapper">
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>

    <div id="nav">
      <router-link to="/">Übersicht</router-link>
      <router-link to="/grundriss">Grundriss</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {
    this.$store.dispatch('loadBoulders');
  },
};
</script>

<style lang="scss">
$bgcolor: hsl(0, 0%, 97%);
$fontcolor: hsl(210, 29%, 24%);
$highlightcolor: hsl(138, 29%, 24%);

body {
  margin: 0;
  background-color: $bgcolor;
  height: 100vh;
}

a {
  text-decoration: none;
  color: $fontcolor;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $fontcolor;
}

#nav {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  align-items: center;
  justify-content: space-evenly;
  background-color: hsl(0, 0%, 81%);

  a {
    font-weight: bold;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: 0px 0px 3px 3px;

    &.router-link-exact-active {
      color: $highlightcolor;
      border-bottom: none;
      background-color: $bgcolor;
    }
  }
}

.container {
  max-width: 960px;
  margin: auto;
  padding: 10px 15px;
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
