<template>
  <div>
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
      boulders: [
        {
          id: 1,
          name: "Dachschaden",
          difficulty: "B5",
          tags: ["tag1", "tag2"],
        },
        { id: 2, name: "Witniss the fitniss", difficulty: "B5", tags: [] },
      ],
    };
  },
};
</script>
<style lang="scss">
    
</style>
