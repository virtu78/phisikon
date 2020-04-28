<template>
  <svg
    class="icon"
    style="width:40px;height:40px;"
    viewBox="0 0 444.815 444.815" 
  >
    <path :d="path" />
  </svg>
</template>

<script>
import icons from './icons.json';

export default {
  name: 'Close',
  props: {
    name: String,
  },
  computed: {
    path() {
      return icons[this.name];
    },
  },
};
</script>

<style lang="scss">



    .icon {
    cursor: pointer;
    border: none;
    padding: 0;
    background-color: #1f09e5;
    color:#e5097f;
    

    }
