<template>
<div class="container">
  <div class="filter">
    <select name="sort-by" id="sort-by" @change="updateSortBy($event.target)">
      <optgroup label="Sortieren">
        <option value="date">Neueste</option>
        <option value="difficulty">Schwierigkeit</option>
        <option value="rating">Bewertung</option>
      </optgroup>
    </select>
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
  <img class="add-button" @click="toAddBoulderView" src="@/assets/add-button.png" alt="add-boulder-button">
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
      sortBy: "newest",

    };
  },
  computed: {
    boulders() {
      return this.$store.getters.getBoulders(this.sortBy);
    },
    filteredBoulders() {
      if (this.searchText != "") {
        return getMatches(this.searchText, this.boulders);
      } else {
        return this.boulders;
      }
    },
  },
  methods: {
    updateSortBy(target) {
      this.sortBy = target.value;
    },
    toAddBoulderView() {
      this.$router.push("/boulder/add");
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

.filter {
  display: flex;
  padding: 10px 0;
  margin-bottom: 5px;

  justify-content: space-between;

  input {
    width: 50%;
    font-size: 1.2rem;
  }
}

.add-button {
  position: fixed;
  bottom: 15%;
  right: 15%;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  box-shadow: 0 0 3px lightgray;

  &:hover {
    cursor: pointer;
  }
}

</style>
