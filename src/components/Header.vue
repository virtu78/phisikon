<template>
  <div class="header">
    <div class="wrapper">
      <h1 class="header__title" v-if="hasHeader">Витрина</h1>
      <div class="header__options">        
      </div>
      <div class="header__options">
        <!--<button class="savefile" @click='readRequest'>Export data to local txt file</button>-->        
        <span class="header__toogle" >Переключить рубли/бонусы</span>
        <button @click=" updateValue"   class="favorite-counter__icon"
          :class="{'favorite-counter__icon--active': this.hasBeenToogle}">
            <font-awesome-icon icon="toggle-off" />
        </button>   
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  props: {
    hasHeader: Boolean,  
   
    },
  
  data: function () {
    return {
       hasBeenToogle: false,
    }
  },
  computed:{
    imumks(){      
      return this.$store.getters.getimumk
    },
  },
 methods: {   
    updateValue() {
          this.hasBeenToogle = !this.hasBeenToogle; 
          this.$emit('rubbonus-changed', this.hasBeenToogle )
          },   
    readRequest() { 
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(this.imumks , null, 2)], {
      type: "text/plain"
      }));
      a.setAttribute("download", "data.txt");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
};
</script>

<style lang="scss" scoped>
.savefile{
  position: absolute;
  right:400px;
  font-size: 14px;
  color: rgb(15, 1, 48)
}
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
  .favorite-counter {
  box-sizing: border-box;
  display: flex;
  align-items: center;
 
  &__icon {
    position:absolute;
    right:5px;
    font-size: 18px;
    color: rgb(0, 0, 0);
    margin-right: 10px;
    transition: color 0.3s;
     border-radius:15px;
    &--active {
      color: rgb(243, 182, 13);
;
    }
  }
  }
  &__toogle{
     position:absolute;
    right:65px;
    margin: 0;
    //font-weight: 500;
    font-size: 14px;
    color: #fff
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