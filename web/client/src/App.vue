<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/grundriss">Grundriss</router-link>
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
      
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  max-width: 960px;
  margin: auto;
}
</style>
