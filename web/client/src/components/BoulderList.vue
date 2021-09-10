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
    <input v-model="searchText" placeholder="Suche">
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
  <div class="add-button" @click="toAddBoulderView"> </div>
</div>
</template>
<script>
import BoulderListEntry from "./BoulderListEntry.vue";
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
      return this.$store.getters["boulders/getBoulders"](this.sortBy);
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
  created() {
    this.$store.dispatch('boulders/loadBoulders');
  }
};
</script>
<style lang="scss">
@import "@/assets/_variables.scss";

.boulder-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  padding-bottom: 10px;
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
  content: "";
  bottom: 10%;
  right: 10%;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  box-shadow: 0 0 3px lightgray;
  background-color: $primary;

  &:hover {
    cursor: pointer;
  }
}

</style>
