<template>
  <div class="header">
    <div class="wrapper">
      <h1 class="header__title" v-if="hasHeader">Игры</h1>

      <button v-show="isButtonEnabled" class="play-button" v-if="hasHeader"  >
        <router-link  style="color:#fff" :to="{ name : 'Game', params: {name: currentgame.name}}" >
          <font-awesome-icon   icon="play" />Играть
        </router-link>
      </button>

      <router-link to="/All" v-else>
        <button class="header__button">
          <font-awesome-icon icon="arrow-left" />
        </button>
      </router-link>

      <div class="header__options">
        <router-link to="/settings" v-if="hasHeader">
          <button class="header__button">
            <font-awesome-icon icon="cog" />
          </button>
        </router-link>
        <button class="header__button" @click="signOut">
          <font-awesome-icon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: "Header",
  props: {
    hasHeader: Boolean,  
    currentgame: Object,
    },
  
  data: function () {
    return {
      isButtonEnabled: false,
      canPass: false,
    }
  },
  watch: {
    currentgame: function() {
      this.canPass = this.currentgame.name.length > 4;
     // console.log(this.currentgame.name.length)
      this.isButtonEnabled = this.canPass;
    }
  },
  methods: {
    signOut: function() {
      firebase.auth().signOut().then(() => this.$router.replace('/'))
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
 // background: #009688;
 background: #000000;
  box-sizing: border-box;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1920px;
    box-sizing: border-box;
    min-height: 60px;
    padding: 10px 15px;
  }
  &__title {
    margin: 0;
    font-weight: 500;
    font-size: 24px;
    color: #fff;
  }
  &__options {
    display: flex;
    align-items: center;
  }
  &__button {
    cursor: pointer;
    border: none;
    padding: 0;
    background: transparent;
    font-size: 20px;
    color: #fff;
    margin-left: 15px;
    &:first-child {
      margin-left: 0;
    }
  }
}

.play-button {
  cursor: pointer;
  outline: none;
  padding: 10px 15px;
  border: 1px solid #fff;
  background-color: transparent;
  font-size: 16px;
  color: #fff;
  opacity: 0.7;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  .fa-play {
    margin-right: 10px;
    font-size: 14px;
    color: inherit;
  }
}
</style>