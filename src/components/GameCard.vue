<template>
  <div class="game-card">
    <div class="game-card__preview">
     
     
      <img  :src='game.logo' class="game-card__image" />
      
      <button class="game-card__save-button">
        <font-awesome-icon icon="save" />
      </button>
    </div>
    <div class="game-card__info">      
      
      <router-link tag="div" class="game-card__title" :to="{ name : 'Game', params: {name: game.name}}" >
        <span @click="PlaedIncrement">{{game.name}}</span>
      </router-link>
      <div class="game-card__text" v-html="game.description">}</div>
      <div class="game-card__stat">
        <div class="views-counter">
          <div class="views-counter__icon">
            <font-awesome-icon icon="eye" />
          </div>
          <div class="views-counter__value">{{game.played}}</div>
        </div>
        <div class="favorite-counter">
          <div @click="like"
           class="favorite-counter__icon"
           :class="{'favorite-counter__icon--active': this.hasBeenLiked}"
           >
            <font-awesome-icon icon="heart" />
          </div>
          <div class="favorite-counter__value">{{game.likes.length}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import { mapState} from 'vuex'; 

import firebase from 'firebase';
export default {
  name: "GameCard",
  props: {
    game: Object,
    likesFilterToSettingsIsLiked: Boolean,  
      
 
  },
  data: function () {
    return {
       hasBeenLiked:false, 
      
    }
  },
 methods: {
  
     addLike: function()   {

 class DBwork {
          constructor(FirebaseVariable) {
            this.db = FirebaseVariable;
          }



         async SetLike(game,user){

            var DocumentId = await new Promise(resolve => {
                this.db.firestore().collection('games').where('name','==',game).get().then(r=>{
                    resolve(r.docs[0].id)
                })
            });

            this.db.firestore().collection('games').doc(DocumentId).update({
                "likes": firebase.firestore.FieldValue.arrayUnion(user),
            })

           // console.log(DocumentId);

        }

          }  
     
      var variable = new DBwork(firebase);

console.log(this.game);
        
       variable.SetLike(this.game.name, this.currentUserId).then(r =>{


        
      })
    },

     removeLike: function()  {

 class DBwork {
          constructor(FirebaseVariable) {
            this.db = FirebaseVariable;
          }



        async RemoveLike(game,user){

            var DocumentId = await new Promise(resolve => {
                this.db.firestore().collection('games').where('name','==',game).get().then(r=>{
                    resolve(r.docs[0].id)
                })
            });

            this.db.firestore().collection('games').doc(DocumentId).update({
                "likes": firebase.firestore.FieldValue.arrayRemove(user),
            })

            // console.log(DocumentId);

        }

          }  

           var variable = new DBwork(firebase);
           console.log(this.game);
     variable.RemoveLike(this.game.name, this.currentUserId).then(r =>{    
      })
},
     like() {
        
       this.hasBeenLiked ?  this.game.likes.pop() && this.removeLike() :  this.game.likes.push(this.currentUserId) && this.addLike()   ;
       this.hasBeenLiked = !this.hasBeenLiked;  //this.likesFilterToSettingsIsLiked = this.game.hasBeenLiked;   
      }, 

PlaedIncrement ()  {

class DBwork {
          constructor(FirebaseVariable) {
            this.db = FirebaseVariable;
          }
async PlayedInc(game){

            var DocumentId = await new Promise(resolve => {
                this.db.firestore().collection('games').where('name','==',game).get().then(r=>{
                    resolve(r.docs[0].id)
                })
            });

            this.db.firestore().collection('games').doc(DocumentId).update({
                //В инкремент передается насколько нужно увеличить поле
                "played": firebase.firestore.FieldValue.increment(1)
            })

        }
      }
         var variable = new DBwork(firebase);
           console.log(this.game);
     variable.PlayedInc(this.game.name).then(r =>{
    
      })

},


 },
  computed:{
 ...mapState({
    user: state => state.user,
    
  }),
    currentUserEmail() {
      return this.$store.getters.currentUserEmail
    },
    currentUserId() {
      return this.$store.getters.currentUserId
    },

    logoFilterToVisible() {
      return this.$store.getters.logoFilterToVisible
    },  

   /* isLiked(){
     const like = this.game.likes.find(item => item === "EUKMFWmEkMxOFxYK2Uf3rIkvgn1"
); console.log(like)
        if (like==="EUKMFWmEkMxOFxYK2Uf3rIkvgn1")
          this.hasBeenLiked==true;  
           return this.hasBeenLiked;
  }   
        
     
    */    
      
     


  },
  created: function() { 
 const like = this.game.likes.find(item => item === this.currentUserId
); console.log(like)
        if (like)
          this.hasBeenLiked=true;  
  },
  mounted: function() {
    const userId = firebase.auth();
    this.$store.commit('SET_USER', userId)
    //console.log(userId);   
    
           






    },
 
};
</script>

<style lang='scss' scoped>
.game-card {
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: box-shadow 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);  
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    .game-card__save-button {
      display: block;
    }
  }
  &__preview {
    position: relative;
    display: flex;
    width: 100%;
    height: 180px;
    background-color: #eee;
    padding: 15px;
    box-sizing: border-box;
  }
  &__image {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  &__save-button {
    display: none;
    position: absolute;
    bottom: 15px;
    left: 15px;
    outline: none;
    cursor: pointer;
    padding: 0;
    border: none;
    background: transparent;
    font-size: 24px;
    color: #000;
    opacity: 0.1;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.3;
    }
  }
  &__info {
    padding: 15px;
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
  }
}
.views-counter {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  &__icon {
    font-size: 18px;
    color: #009688;
    margin-right: 10px;
    transition: color 0.3s;
  }
  &__value {
    font-size: 14px;
    color: #000;
  }
}
.favorite-counter {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  &__icon {
    font-size: 18px;
    color: #eee;
    margin-right: 10px;
    transition: color 0.3s;
    &:hover,
    &--active {
      color: #cb3837;
    }
  }
  &__value {
    font-size: 14px;
    color: #000;
  }
}
</style>