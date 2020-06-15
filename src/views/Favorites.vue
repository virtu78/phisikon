<template>
  <div>
    <Header :hasHeader="header"/>
    <Preloader :data="true"/>
    <div class="wrapper">
      <div class="filters">
        <div class="filters__col">
          <Input label="Название" />
        </div>
        <div class="filters__col">
          <Input />
        </div>
      </div>
      <nav class="tabsNav">
        <router-link to="/all" >
          <button class="tabsNav__button">Все</button>
        </router-link>
        <router-link to="/favorites" >
          <button class="tabsNav__button tabsNav__button--active">Избранные</button>
        </router-link>
        <router-link to="/mine" >
          <button class="tabsNav__button">Мои</button>
        </router-link>
        <router-link to="/downloaded" >
          <button class="tabsNav__button">Загруженные</button>
        </router-link>
         <router-link to="/created" >
          <button class="tabsNav__button">Создать</button>
        </router-link>
      </nav>
      <div class="games">
        
          <GameCard  @click="handleClick(index)"  v-for="(game, index) in  logoFilterToLiked"  :game="game" :key="index" class="games__item" />       
              
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import Input from "../components/Input";
import GameCard from "../components/GameCard";
import Preloader from "../components/Preloader";
import Vuex from 'vuex';
import { mapState} from 'vuex'; 
import firebase from 'firebase';
export default {
  name: "Favorites",
  components: {
    Header,
    Input,
    GameCard,
    Preloader
  },
 props: {
    game: Object,
    likesFilterToSettingsIsLiked: Boolean,  
      
 
  },
  data: function () {
    return {
       header: true,   
      selectedItem: null,
       hasBeenLiked:false, 
      
    }
  },
 methods: {
  
      

          

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
        
        
 
       
       this.game.likes.pop() && this.removeLike()   ;
      // this.hasBeenLiked = !this.hasBeenLiked; 
       //this.likesFilterToSettingsIsLiked = this.game.hasBeenLiked;        




    
        

    
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
    logoFilterToSettings: state => {
      return  state.logoFilterToVisible.map(ToSettings => ToSettings.settings);     
    },
    logoFilterToLiked: state => {
     return state.logoFilterToSettings.filter(ToLikes => ToLikes.likes.includes(state.currentUserId)); 
  
  }   
        
     
        
      
     


  },
  created: function() { 
   this.$store.dispatch('initLogo')
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
<style lang="scss" scoped>
.filters {
  display: flex;
  &__col {
    padding: 15px;
    width: 50%;
  }
}

.tabsNav {
  border-bottom: 1px solid #eee;
  margin: 0 15px;
  &__button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
    min-width: 160px;
    padding: 15px;
    text-transform: uppercase;
    font-size: 16px;
    color: gray;
    transition: color 0.3s, border-color 0.3s;
    &:hover {
     // color: #009688;
       color: #cb3837;
    }
    &--active {
      //border-bottom: 2px solid #009688;
     /// color: #009688;
       border-bottom: 2px solid #cb3837;
      color: #cb3837;
    }
  }
}

.games {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 7.5px;
  &__item {
    box-sizing: border-box;
    padding: 7.5px;
    width: 100%;
    @media (min-width: 375px) {
      width: 50%;
    }
    @media (min-width: 576px) {
      width: 33.33%;
    }
    @media (min-width: 768px) {
      width: 25%;
    }
    @media (min-width: 992px) {
      width: 20%;
    }
    @media (mainwidth: 1024px) {
      width: 16.66%;
    }
    @media (min-width: 1300px) {
      width: 14.2857142857%;
    }
    @media (min-width: 1440px) {
      width: 12.5%;
    }
    @media (min-width: 1600px) {
      width: 11.11%;
    }
  }
}
</style>
