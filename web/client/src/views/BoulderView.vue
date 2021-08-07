<template>
  <div class="boulder-view">
    <h1 class="title">{{boulder.name}}</h1>
    <span class="creator">by {{boulder.creator}}</span>
  </div>
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
<style lang="scss">
.boulder-view {
  display: grid;
  grid-template-areas: 
    "img title creator"
    "img difficulty difficulty";
  grid-template-columns: 20% 50% 30%;
  align-items: baseline;
}

.title {
  grid-area: title;
}

.creator {
  grid-area: creator;
  font-style: italic;
}
</style>
