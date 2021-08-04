<template>
  <div class="home">
    <boulder-list></boulder-list>
  </div>
</template>

<script>
// @ is an alias to /src
import BoulderList from '@/components/BoulderList.vue';

export default {
  name: "Home",
  components: {
    BoulderList,
  },
};
</script>
