<template>
<div class="container">
  <div class="filter">
    <input v-model="searchText">
  </div>
  <div v-if="filteredBoulders.length === 0" class="no-boulder-list">
      <span>No boulders found.</span>
    </div>
  <div v-else class="boulder-list">
    <BoulderListEntry
      v-for="(entry, index) in filteredBoulders"
      :key="index"
      :boulder="entry"
    ></BoulderListEntry>
  </div>
</div>
</template>
<script>
import BoulderListEntry from "../components/BoulderListEntry.vue";
import { getMatches } from "@/util/filter.js";

export default {
  name: "BoulderList",
  components: {
    BoulderListEntry,
  },
  data() {
    return {
      searchText: "",

    };
  },
  computed: {
    boulders() {
      return this.$store.getters.getBoulders;
    },
    filteredBoulders() {
      if (this.searchText != "") {
        return getMatches(this.searchText, this.boulders);
      } else {
        return this.boulders;
      }
    },
  },
};
</script>
<style lang="scss">
.boulder-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.filter {
  display: flex;
  padding: 10px 0;
  margin-bottom: 5px;

  justify-content: flex-end;

  input {
    width: 50%;
    font-size: 1.2rem;
  }
}

</style>
