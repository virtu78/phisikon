<template>
  <div id="crd" class="game-card">
    <div class="game-card__preview">    
      <img src="../assets/images/globus.png" alt class="game-card__image" />
    </div>
    <div class="game-card__info">    
      <div class="text1">{{newtitle[0]}}</div><br>
      <div class="text2">{{newtitle[1]}}</div><br>
      <div class="text3">{{newtitle[2]}}</div>         
    </div>
    <div class="game-card__stat">
      <div class="views-counter">
        <div class="views-counter__icon">
          <font-awesome-icon icon="cart-arrow-down" />
        </div>
        <div  class="views-counter__value">{{this.prcBnsToogle}}</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { mapState} from 'vuex'; 

export default {
  name: "Card",
  props: {
    imumkitem: Object,
    clickRubBonus: Boolean
  },
  data: function () {
    return {    
     
    }
  },
 methods: {
    
 },
  computed:{
 ...mapState({
  }),
    newtitle() { 
      let  heading    
        heading=this.imumkitem.title.replace(/[.]/g, ',');     
        let separator = /\s*,\s*/;
        let title = heading.split(separator);         
       return title       
      },
    prcBnsToogle(){
      let porb;
            
      porb = (this.clickRubBonus==false) ? this.imumkitem.price + " рублей " : this.imumkitem.priceBonus + " бонусов ";   
    return porb
   } 
  },
  
};
</script>

<style lang='scss' scoped>
.game-card {
  cursor: pointer; 
  border-radius: 15px;
  margin: 1%;
   
  overflow: hidden;
  transition: box-shadow 0.3s;  
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);  
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    
  }
     &__active {

      background-color:rgb(153, 156, 156);
    }
  &__preview {
    position: relative;
    display: flex;
    width: 100%;
    height: 180px;
    background-color: #eee;
    padding: 0;
    box-sizing: border-box;
  }
  &__image {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
 
  &__info {
   padding:0;
   // background-color:yellow;
   height: 7.5em;
    position: relative 
  }
  div.text1{
    //background-color:aqua;
        height: 1em;
    position: absolute;
    
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%)
   
  }
  div.text2{
    //background-color:aqua;        
    position: absolute;
    bottom:50px;
    left: 50%;
    height: 1em;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
   div.text3{
    //background-color:aqua;        
    position: absolute;
    bottom:8px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
  &__title {
    height:80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 1.4;     
    max-height: 2.8;      
   -webkit-line-clamp: 4; /* number of lines to show */
   -webkit-box-orient: vertical;
    font-size: 20px;
    margin-bottom: 15px;
  }
  &__text {
    height:80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 1.4;     
    max-height: 2.8;      
   -webkit-line-clamp: 4; /* number of lines to show */
   -webkit-box-orient: vertical;

   // line-height: 1.4;
    font-size: 14px;
    margin-bottom: 15px;
  }
  &__stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.5em;    
    padding:5px;
  }
}
.views-counter {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  &__icon {
    font-size: 18px;
   // color: #009688;
    color: #0a44c0;
    margin-right: 10px;
    transition: color 0.3s;
  }
  &__value {
    font-size: 18px;
    color: rgb(0, 0, 0);
 
  }
}
.favorite-counter {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  &__icon {
    font-size: 18px;
    color: rgb(0, 0, 0);
    margin-right: 10px;
    transition: color 0.3s;
    &:hover,
    &--active {
      color: #e70000;
    }
  }
  &__value {
    font-size: 14px;
    color: #000;
  }
}
</style>