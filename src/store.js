import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    user:{},
    game:{},
    games: [],
    acunte:[],
    logo:[],
    logos:[],
    background:[],
    likes:[],
    media:[],
    answer:null,
    defaultBackground:'https://bitvaumov-4a5e6.firebaseapp.com/assets/background.png?alt=media&JbPchyJe',
  },
  getters: {

    currentUserEmail: state => {      
      return  state.user.currentUser.email;
    },
    currentUserId: state => {      
        return  state.user.currentUser.uid;
      },
      preMedia: state => {      
      return  state.media.questions[0].preMedia;
    },
    postMedia: state => {      
      return  state.media.questions[0].postMedia;
    },
    //acunte:state =>  state.acunte.filter(acunte => acunte.email === user.email),
    likesFilterToVisible: state => {
      return  state.likes.filter(likesvisible => likesvisible.settings.visible);
    },
    
  logoFilterToVisible: state => {
    return  state.logo.filter(logovisible => logovisible.settings.visible);
  },

   
    },

  
  mutations: {
    SET_GAMES: (state, games) => {
      state.games = games;
    },
    SET_ACUNTE: (state, acunte) => {
      state.acunte = acunte;
    },
    SET_LOGO: (state, logo) => {
      state.logo = logo;
    },
    SET_LOGOS: (state, logos) => {
      state.logos = logos;
    },
    SET_BACKGROUND: (state, background) => {
      state.background = background;
    },
       SET_MEDIA: (state, media) => {
      state.media = media;
    },
    SET_LIKE: (state, likes) => {
      state.likes = likes;
    },
        SET_DISLIKE: (state, likes) => {
      state.likes = likes;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ANSWER: (state, answer) => {
      state.answer = answer;
    }
  },
  actions: {
    initGames: ({commit}) => {
      firebase.firestore().collection('games')
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data())
        commit('SET_GAMES', data);
      })
    },
    initAcunte ({commit})  {
      firebase.firestore().collection('accounts')
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data())
        commit('SET_ACUNTE', data);
        
      })
    },      
    initLogo ({commit})  {
        var storage = firebase.storage();
      
          var storageRef = storage.ref();
       class DBwork {
                constructor(FirebaseVariable) {
                    this.db = FirebaseVariable;
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
                                                   
      
       
                                                    let logoPath = new Promise(resolve3=>{
                                                        firebase.storage().ref().child(data[i].logo).getDownloadURL().then(function (url) {
                                                            resolve3(url);
                                                        }).catch(function (error) {  
                                                        });
                                                    });
                                                   // console.log(i);  
       
      
                                                        
                                                        
                                                        data[i].logo = await logoPath;
                                                        
                                             
                                                }  
                                                parse(dbLocal);
                                                //парсинг  
                                              //  console.log(data[i].background)  
                                                res.push({
                                                    "questions":temp,
                                                    "settings":data[i],
                                                });  
                                                
                                                if(i>=queryresult.length-1){
                                                   // console.log("resolve");
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
      
      var variable = new DBwork(firebase);
      variable.GetGamesInfo("games", x=>x).then(r=>{
              //r.forEach(x=>console.log(x.questions.forEach(x=>console.log(x))));
              //Вывести все
               //console.log(r);
               //Только вопросы с ответами
              //r.forEach(x=>console.log(x.questions));
              //Только настройки(Название игры, фоновая музыка, лого и тд)
              //r.forEach(x=>console.log(x.settings));
              commit('SET_LOGO', r);
      });

      
    },
    initLogos ({commit})  {
      var storage = firebase.storage();
    
        var storageRef = storage.ref();
     class DBwork {
              constructor(FirebaseVariable) {
                  this.db = FirebaseVariable;
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
                                                 
    
     
                                                let logosPath = new Promise(resolve4=>{

                                                  let el = [];
  
                                                  for(var j=0;j<data[i].logos.length;j++)
                                                  (async function(j) {
                                                      setTimeout(function() {
                                                          firebase.storage().ref().child(data[i].logos[j]).getDownloadURL().then(localUrl=> {
                                                             // console.log(localUrl);
                                                              el.push(localUrl);
                                                              // var temp = r.docs.map(x => x.data());
                                                              //
                                                              // var dbLocal = new DBwork(db);
  
                                                              if(el.length>=data[i].logos.length-1){
                                                                  resolve4(el);
                                                              }
  
                                                          })
                                                      }, 10);
                                                  })(j);  
                                              });
                                                 // console.log(i);                                                      
                                                      
                                                      data[i].logo = await logosPath;                                                      
                                           
                                              }  
                                              parse(dbLocal);
                                              //парсинг  
                                            //  console.log(data[i].background)  
                                              res.push({
                                                  "questions":temp,
                                                  "settings":data[i],
                                              });  
                                              
                                              if(i>=queryresult.length-1){
                                                 // console.log("resolve");
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
    
    var variable = new DBwork(firebase);
    variable.GetGamesInfo("games", x=>x).then(r=>{
            //r.forEach(x=>console.log(x.questions.forEach(x=>console.log(x))));
            //Вывести все
            // console.log(r);
             //Только вопросы с ответами
            //r.forEach(x=>console.log(x.questions));
            //Только настройки(Название игры, фоновая музыка, лого и тд)
            //r.forEach(x=>console.log(x.settings));
            commit('SET_LOGOS', r);
    });    
    },
    initBackground ({commit})  {
      var storage = firebase.storage();
    
        var storageRef = storage.ref();
     class DBwork {
              constructor(FirebaseVariable) {
                  this.db = FirebaseVariable;
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
                                                 
    
                                                 //парсинг фоновой картинки
                                                 let backgroundPath = new Promise(resolve1 => {
                                                  firebase.storage().ref().child(data[i].background).getDownloadURL().then(function (url) {
                                                      resolve1(url);
                                                  }).catch(function (error) {
  
                                                  });
                                              });

                                                 // console.log(i);                                                      
                                                      
                                                      data[i].logo = await backgroundPath;                                                      
                                           
                                              }  
                                              parse(dbLocal);
                                              //парсинг  
                                            //  console.log(data[i].background)  
                                              res.push({
                                                  "questions":temp,
                                                  "settings":data[i],
                                              });  
                                              
                                              if(i>=queryresult.length-1){
                                                 // console.log("resolve");
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
    
    var variable = new DBwork(firebase);
    variable.GetGamesInfo("games", x=>x).then(r=>{
            //r.forEach(x=>console.log(x.questions.forEach(x=>console.log(x))));
            //Вывести все
            // console.log(r);
             //Только вопросы с ответами
            //r.forEach(x=>console.log(x.questions));
            //Только настройки(Название игры, фоновая музыка, лого и тд)
            //r.forEach(x=>console.log(x.settings));
            commit('SET_BACKGROUND', r);
    });    
    },
   initLike ({commit})  {

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


        
       variable.SetLike(this.game.name, 'EUKMFWmEkMxOFxYK2Uf3rIkvgn1').then(r =>{


        this.$store.commit(' SET_LIKE', r)
      })
    },

     initDisLike ({commit})  {

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
     variable.RemoveLike(this.game.name, 'EUKMFWmEkMxOFxYK2Uf3rIkvgn1').then(r =>{


    this.$store.commit(' SET_DISLIKE', r)
      })
     





},


}








   
})






