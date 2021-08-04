<template>
  <div class="entry">
    <div class="name">
      {{ boulder.name }}
    </div>
    <div class="difficulty">
      {{ boulder.difficulty }}
    </div>
    <span v-for="(tag, index) in boulder.tags" :key="index" class="tag">
      {{ tag }}
    </span>
  </div>
</template>
<script>
export default {
  name: "BoulderListEntry",
  props: {
    boulder: Object,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.entry {
  box-shadow: 2px 1px 4px;
  margin: 10px;
  padding: 1em;
  border-radius: 0.2em;
}

.name {
  float: left;
}

.difficulty {
  float: left;
}

.tag {
  color: white;
  background-color: red;
  padding: 0.3em 0.5em;
  border: 1px solid grey;
  border-radius: 0.6em;
  margin: 3px 5px;
  box-shadow: 2px 1px 5px;
}
</style>
