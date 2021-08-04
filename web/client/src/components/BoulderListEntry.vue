<template>
  <div class="entry" :class="[isActive ? 'is-active' : '']" @mouseenter="isActive = true" @mouseleave="isActive = false">
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
  box-shadow: 1px 1px 4px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: 50ms ease;
  flex: 33%;
  text-align: left;
  position: relative;

  &.is-active {
    background-color: hsla(0, 0%, 92%, 0.788);
    box-shadow: 2px 1px 7px;
  }

    #name {

    }

    #madeBy {
        font-size: .8em;
        font-style: italic;
    }

    #difficulty {
        
    }

    #tags {
        display: flex;
    }

    .tag {
    color: white;
    background-color: red;
    padding: 2px 6px;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 3px 5px;
    box-shadow: 2px 1px 5px;
    }
}


</style>
