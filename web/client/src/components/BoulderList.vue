<template>
  <div class="boulder-list">
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
    return {
      boulders: [],
    };
  },
  created() {
    this.boulders = require("@/data/mockdata.json");
  },
};
</script>
<style lang="scss">
.boulder-list {
    display: flex;
}
</style>
