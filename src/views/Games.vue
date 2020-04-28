
]\<template>
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
          <button class="tabsNav__button tabsNav__button--active">Все</button>
        </router-link>
        <router-link to="/favorites" >
          <button 
          class="tabsNav__button">Избранные</button>
        </router-link>
        <router-link to="/mine" >
          <button class="tabsNav__button">Мои</button>
        </router-link>
        <router-link to="/downloaded" >
          <button class="tabsNav__button">Загруженные</button>
        </router-link>
         <button @click="SuperCheck" class="tabsNav__button">Check</button>
      </nav>      
        <div class="games">          
          <GameCard  @click="handleClick(index)"  v-for="(game, index) in  logoFilterToSettings"  :game="game" :key="index" class="games__item" />       
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
  name: "All",
  components: {
    Header,
    Input,
    GameCard,
    Preloader
  },
    props: {        
  },  
  data: function () {
    return {
      header: true,   
      selectedItem: null,
      
    }
  },
  methods: {
    
    handleEditClick(index) {
      this.selectedItem = index;
      console.log(this.selectedItem);
    },
    Check() {
      class DBwork {
          constructor(FirebaseVariable) {
            this.db = FirebaseVariable;
          }
         Search(collection,condition){
          return new Promise(resolve => {
            this.db.firestore().collection(collection).get()
            .then(querySnapshot => {
              var array = querySnapshot.docs;
              var result = array.filter(condition);
                //var  = temp.filter(x => x.data());
                //result.forEach(x => console.log(x.data()));
              resolve(result);
            });
          })
        }
      }
     
      var variable = new DBwork(firebase);

 
      variable.Search('accounts', x => x.data().name===" Админ - я").then(res =>{
        res.forEach(x => console.log(x.data()));
      });
    },
    SuperCheck() {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      class DBwork {
          constructor(FirebaseVariable) {
              this.db = FirebaseVariable;
          } 
        UserExistCheck(email) {
            return new Promise(resolve => {
                this.db.auth().fetchSignInMethodsForEmail(email).then(r => {
                    r.length > 0 ? resolve(1) : resolve(-1);
                });
            })
        }

        Search(collection, condition) {
            return new Promise(resolve => {
                this.db.firestore().collection(collection).get()
                    .then(querySnapshot => {
                        var array = querySnapshot.docs;
                        var result = array.filter(condition);
                        //var  = temp.filter(x => x.data());
                        //result.forEach(x => console.log(x.data()));
                        resolve(result);


                    });
            })
        }

        SetLike(game, user) {
            return new Promise(resolve => {
                this.db.firestore().collection('games').doc(game).update({
                    "likes": firebase.firestore.FieldValue.arrayUnion(user),
                })
            })
        }
        GetUserID(email) {
            return new Promise(resolve => {
                this.Search('accounts', x => x).then(res => {
                    this.UserExistCheck(email).then(r=>{
                        if(r===-1){
                            resolve("");
                        }
                        else{
                            for (var i = 0; i < res.length; i++) {
                                if (String(res[i].data().name).indexOf(email) !== -1) {
                                    resolve(res[i].id);
                                    break;
                                }
                            }
                            resolve("");
                        }
                    })
                });
            })
        }
        //Поиск вопросов
        //Поиск ответов
        //Кол-во лайкнувших
        //Кол-во
        GetLikesCount(collection, condition) {
            return new Promise(resolve => {
                this.Search(collection, condition).then(r => {
                    var res = r.map(x => x.data().likes.length);
                    r.forEach(x => console.log(x.data().likes.length));
                });
            })
        }

          //Ищем игры по заданному фильтру(Получаем ссылки на бд и тд)
        GetGamesInfo(collection, condition) {
              return new Promise(resolve => {  
                  this.db.firestore().collection(collection).get()
                      .then(querySnapshot => {  
                          var array = querySnapshot.docs;  
                          var queryresult = array.filter(condition);  
                          var data = queryresult.map(x => x.data());  
                          var res = [];  
                          for(var i=0;i<queryresult.length;i++){
                              (async function(i,db) {
                                  setTimeout(function() {
                                      firebase.firestore().collection(collection).doc(queryresult[i].id).collection("questions").get().then(r=>{
                                          var temp = r.docs.map(x=>x.data());  
                                          var dbLocal = new DBwork(db);  
                                          //парсинг  
                                          async function parse(dbparse) {  
                                             

 
                                            var isLiked = new Promise(resolve5 =>{
                                                //dbLocal.GetUserID()
                                                dbLocal.GetUserID('virtu78@yandex.ru').then(r=>{
                                                    let islike;
                                                    if(r.length>0){
                                                        islike = true;
                                                    }
                                                    else{
                                                        islike=false;
                                                    }
                                                  //  console.log(data[i-1]);
                                                    resolve5(islike);
                                                });
                                            })
                                             // console.log(i);  
 

                                                  
                                                  
                                                  data[i].isliked = await isLiked;
                                                console.log(data[i].isliked);
                                                console.log(i);
                                                  
                                       
                                          }  
                                          parse(dbLocal);
                                          //парсинг  
                                        //  console.log(data[i].background)  
                                          res.push({
                                              "questions":temp,
                                              "settings":data[i],
                                          });  
                                          
                                          if(i>=queryresult.length-1){
                                              console.log("resolve");
                                              resolve(res);
                                          }  
                                      })  
                                  }, 10);
                              })(i,this.db);    
                          }  
                      });  
              })  
          }
        }
//Получить настройки пользователя по нику
    // GesUserSettings(username){
    //     this.db.firestore().collection('accounts').get().then(r =>{
    //         var array = r.docs;
    //
    //         var result = array.filter(x=>x.data().name===username);
    //         console.log(result.data());
    //     })
    // }
var variable = new DBwork(firebase);
variable.GetGamesInfo("games", x=>x).then(r=>{
        //r.forEach(x=>console.log(x.questions.forEach(x=>console.log(x))));
        //Вывести все
         console.log(r);
         //Только вопросы с ответами
        //r.forEach(x=>console.log(x.questions));
        //Только настройки(Название игры, фоновая музыка, лого и тд)
        //r.forEach(x=>console.log(x.settings));
        
});
}
},
  computed:{
 ...mapState({
    user: state => state.user
  }),
    currentUserEmail() {
      return this.$store.getters.currentUserEmail
    },
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    likesFilterToVisible() {
      return this.$store.getters.likesFilterToVisible
    },
    likesFilterToSettingsIsLiked: state => {
      return  state.likesFilterToVisible.map(ToSettingsIsLiked => ToSettingsIsLiked.settings.isliked);     
    },
    logoFilterToVisible() {
      return this.$store.getters.logoFilterToVisible
    },
    logoFilterToSettings: state => {
      return  state.logoFilterToVisible.map(ToSettings => ToSettings.settings);     
    },

   
  },
  created: function() {    
    this.$store.dispatch('initLogo')

  },
  mounted: function() {
    const userId = firebase.auth();
    this.$store.commit('SET_USER', userId)
   // console.log(userId);   
    }
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
      color: #009688;
    }
    &--active {
      border-bottom: 2px solid #009688;
      color: #009688;
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
