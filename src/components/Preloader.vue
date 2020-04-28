<template>
  <div class="preloader" v-if="data == false">
      <img src="../assets/images/preloader.gif" alt="preloader" />
  </div>
</template>

<script>

export default {
  name: "Preloader",
  components: {},
  props: ['data'],
  data: function () {
    return {
    }
  },
};
</script>

<style lang="scss" scoped>
    .preloader {
        position: absolute;
        height: 100%;
        min-height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        background: #fff;
        img {
            width: 50px;
        }
    }
</style>