<template>
  <div class="loading-screen">
    <div class="loading">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading",
};
</script>
<style lang="scss">
@import "@/assets/_variables.scss";

.loading-screen {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba($other, 0.5);
  position: fixed;
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;

  .loading {
    display: flex;
    flex-wrap: wrap;
    width: 5.2rem;
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {transform: rotate(0deg);}
    25% {transform: rotate(45deg);}
    50% {transform: rotate(180deg);}
    75% {transform: rotate(315deg);}
    100% {transform: rotate(360deg);}
  }

  .box {
    height: 2rem;
    width: 2rem;
    background-color: $primary;
    margin: 0.3rem;
  }
}
</style>