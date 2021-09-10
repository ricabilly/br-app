<template>
  <div class="container">
    Home
    <button @click="success">Set Success: {{isSuccess}}</button>
  </div>
</template>
<script>

export default {
  name: "Home",
  data() {
    return {
      
    }
  },
  methods: {
    success() {
      this.$store.dispatch("setSuccess", true);
    }
  },
  computed: {
    isSuccess() {
      return this.$store.getters.operationSuccess;
    }
  }
}
</script>
<style lang="scss">
  
</style>