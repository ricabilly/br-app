<template>
  <div v-if="boulders.length === 0" class="no-boulder-list">
      <span>No boulders found.</span>
    </div>
  <div v-else class="boulder-list">
    <BoulderListEntry
      v-for="(entry, index) in boulders"
      :key="index"
      :boulder="entry"
    ></BoulderListEntry>
  </div>
  
</template>
<script>
import BoulderListEntry from "./BoulderListEntry.vue";

export default {
  name: "BoulderList",
  components: {
    BoulderListEntry,
  },
  data() {
    return {};
  },
  computed: {
    boulders() {
      return this.$store.getters.getBoulders;
    }
  },
};
</script>
<style lang="scss">
.boulder-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.no-boulder-list {
}
</style>
