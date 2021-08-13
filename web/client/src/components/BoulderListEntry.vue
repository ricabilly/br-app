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

      <div class="lower-part">
        <div id="difficulty">
          {{ boulder.difficulty }}
        </div>
        <div id="rating">
          {{ computedRating }}&#10084;
        </div>
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
  computed: {
    computedRating() {
      return this.boulder.rating < 0 ? "-" : this.boulder.rating;
    }
  }
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
    height: calc(100% - 20px);
  }

  &.is-active {
    background-color: hsla(0, 0%, 92%, 0.788);
    box-shadow: 2px 1px 7px;
  }

  #name {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #madeBy {
    font-size: 0.8em;
    font-style: italic;
    margin: 3px 0 3px 3px;
  }

  .lower-part {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    #difficulty {
    }

    #rating {
    }
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
