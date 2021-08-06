<template>
  <div>BOULDER VIEW for {{ boulder.name }}</div>
</template>
<script>
export default {
  name: "BoulderView",
  data() {
    return {};
  },
  computed: {
      boulder() {
          return this.$store.getters.getBoulder(this.$route.params.id);
      }
  }
};
</script>
<style lang="scss"></style>
