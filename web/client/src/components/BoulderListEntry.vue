<template>
  <div
    class="entry"
    :class="[isActive ? 'is-active' : '']"
    @mouseenter="isActive = true"
    @mouseleave="isActive = false"
  >
    <router-link :to="'/boulder/view/' + boulder.id">
      <div id="name">
        {{ boulder.name }}
      </div>

      <div id="madeBy">
        <span>- {{ boulder.creator }}</span>
      </div>

      <div id="difficulty">
        {{ boulder.difficulty }}
      </div>

      <div id="tags">
        <span v-for="(tag, index) in boulder.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "BoulderListEntry",
  props: {
    boulder: Object,
  },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>
<style lang="scss">
.entry {
  box-shadow: 0 0 2px;
  border-radius: 5px;
  transition: 50ms ease;
  text-align: left;

  a {
    padding: 10px;
    display: block;
  }

  &.is-active {
    background-color: hsla(0, 0%, 92%, 0.788);
    box-shadow: 2px 1px 7px;
  }

  #name {
    font-weight: bold;
  }

  #madeBy {
    font-size: 0.8em;
    font-style: italic;
    margin: 3px 0 3px 3px;
  }

  #difficulty {
  }

  #tags {
    display: none;
    float: right;
  }

  .tag {
    color: white;
    background-color: red;
    padding: 2px 6px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 3px 5px;
    box-shadow: 2px 1px 5px;
    font-size: 0.8em;
    font-weight: bold;
  }
}
</style>
