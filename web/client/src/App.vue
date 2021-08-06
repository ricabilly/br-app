<template>
  <div>
    <div id="nav">
      <router-link to="/">Übersicht</router-link>
      <router-link to="/grundriss">Grundriss</router-link>
      <router-link to="/login">Login</router-link>
      <img
        src="@/assets/chalk-wars-logo-small.png"
        alt="Chalk Wars Logo"
        class="logo"
      />
    </div>
    <div class="container">
      <router-view />
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
$highlightcolor: hsl(153, 47%, 49%);

body {
  margin: 0;
  background-color: $bgcolor;
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
  width: 100vw;
  align-items: center;
  justify-content: space-evenly;
  background-color: hsl(0, 0%, 81%);

  a {
    font-weight: bold;
    padding: 0.5rem 1rem;
    width: 100%;
    border-radius: 3px 3px 0 0;

    &.router-link-exact-active {
      color: $highlightcolor;
      border-bottom: none;
      background-color: $bgcolor;
    }
  }

  img {
    display: none;
    width: 30px;
    padding: 2px 10px;
    margin: 3px;
  }
}

.container {
  max-width: 960px;
  margin: auto;
  padding: 10px 15px;
}
</style>
