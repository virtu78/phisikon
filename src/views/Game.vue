<template>
<div :style="styles"   style="position: fixed; top: 0;  left: 0;  width: 100%;  height: 100%;">
  <div class="header"  >
    <div class="wrapper"> 
      <div class="header__options">
        <div class="circle">
          <router-link to="/All">
            <button   class="header__buttontimes">
              <font-awesome-icon     icon="times" />
            </button>
          </router-link>
        </div>
         <div class="circle">
            <button @click=" prevQuestions"  class="header__buttonleftarrow">
              <font-awesome-icon icon="arrow-left" />           
            </button>
        </div>
      </div>        
      <div class="circle">
        <button @click="nextQuestions"  class="header__buttonrightarrow">
          <font-awesome-icon icon="arrow-right" />           
        </button>  
      </div>
    </div>
  </div>
  <div class="game-card"> 
    <div class="main">
      <div style="margin: auto">            
        <p v-if="current>=0" class="game-card__title" >
         <span class="bold"> Вопрос </span><span class="colored">{{ current + 1 }}/{{ this.getlogoFilterToGame.questions.length }}</span>
        </p>
        <p v-if="current>=0" class="game-card__title"  >
          <span class="semibold">{{ this.getlogoFilterToGame.questions[current].text }}</span>
        </p>  
      </div>      
      <div id="div" class="game-card__preview">    
        <img v-if="current<0" :src='this.getlogoFilterToGame.settings.logo' class="game-card__image" />                    
        
        
        <img  id="image"  v-if="current>0 && this.getlogoFilterToGametAnswer.length>0" :src='img' class="game-card__media" />
        <img  id="image"  v-if="current===0 && this.getlogoFilterToGametAnswer.length>0" :src='img' class="game-card__media" />
      <div  v-if="current>=0 && this.getlogoFilterToGametAnswer.length>0 " class="btn-group">
        <button   id="first"
          @click="getAnswer()"
          class="btn-group__answers">
        {{ this.getlogoFilterToGametAnswer[0].text }}
        </button>
        <button   id="second"
          @click="getAnswer()"
          class="btn-group__answers">
          {{ this.getlogoFilterToGametAnswer[1].text }}
        </button>
        <button   id="third"
          @click="getAnswer()"
          class="btn-group__answers">
          {{ this.getlogoFilterToGametAnswer[2].text }}
        </button>
        <button   id="fourth"
          @click="getAnswer()"
          class="btn-group__answers">
          {{ this.getlogoFilterToGametAnswer[3].text }}
        </button>
      </div> 
      <video id="image" @click="reloadManual" v-if="current===0 && this.getlogoFilterToGametAnswer.length===0" controls :src="img" class="game-card__video">       
      </video>"
      <video id="image" @click="reloadManual" v-if="current>0 && this.getlogoFilterToGametAnswer.length===0" controls :src="img" class="game-card__video">          
      </video>"
      
      </div> 
    <div id="marquee" @click="unvisible" v-if="current>=0 && this.getlogoFilterToGametAnswer.length===0" class="b-marquee">
      <div    class="b-marquee__text">Нажмите на видеоплеере и получите правильный ответ Нажмите на этой строке и она исчезнет</div>
    </div>

        
      

      <div   class="game-card__preview">
        <h2 v-if="current<0" class="game-card__title">{{ $route.params.name}}</h2>
      </div> 
    </div>  
  </div>
</div>
</template>

<script>
import Vuex from 'vuex';
import { mapState} from 'vuex'; 
import firebase from 'firebase';
import {
   
  MdIcon, 
  Typography,
  
} from 'vue-material/dist/components'
export default {
  name: "Game",
  props: {
              
  },
  components: {  
    
  },
   data: function () {
    return {
      current:-1,
      
      buttonId:null,
      img:null,
    isShowPre: true,
    isShowPost: true,
    }
  },
    methods: {    
    nextQuestions: function(){
      if( this.current < this.getlogoFilterToGame.questions.length - 1){
        this.current++
        console.log(this.current)     
        if (this.current>0 && this.getlogoFilterToGametAnswer.length!==0){     
          this.resetButtons();
        }else{
         console.log('oops, no buttons?');
        }
      }
     setTimeout(this.reloadPrevNext, 500)
       
    },
    prevQuestions: function(){
      if( this.current > 0 ){
        this.current--      
        if (this.current>0 && this.getlogoFilterToGametAnswer.length!==0){
          this.resetButtons();
        }else{
         console.log('oops, no buttons?');
        }
      }
      setTimeout(this.reloadPrevNext, 500)
    },
    reloadPrevNext() {
      this.getMedia ();
     setTimeout(this.getPreImg, 1000)
      this.isShowPre = false;
       this.$nextTick(() => {         
      console.log(this.isShowPre)
            
      });
    },
    reloadManual() {
      this.getMedia ();
      setTimeout(this.getPostImg, 500)
      this.isShowPost = false;
      this.$nextTick(() => {         
      console.log(this.isShowPost)
            
      });
    },
    unvisible(){
     document.querySelector('#marquee').remove()
    },
    resetButtons(){
    
      document.getElementById("first").disabled = false;
      document.getElementById("second").disabled = false;
      document.getElementById("third").disabled = false;
      document.getElementById("fourth").disabled = false;
      
      document.querySelector('#first').setAttribute('class','btn-group__answers')
      document.querySelector('#second').setAttribute('class','btn-group__answers')
      document.querySelector('#third').setAttribute('class','btn-group__answers')
      document.querySelector('#fourth').setAttribute('class','btn-group__answers')
    },
    buttonDisable(){
      document.getElementById("first").disabled = true;
      document.getElementById("second").disabled = true;
      document.getElementById("third").disabled = true;
      document.getElementById("fourth").disabled = true;
    },


    getWrong(){
            let button = document.querySelectorAll('button');  
                 let correct=this.correctAnswer.replace(/[^A-Za-zА-Яа-яЁё]/g, "")
            for(let i=0; i<button.length; i++){
              
              let allButtons =button[i].innerHTML.replace(/[^A-Za-zА-Яа-яЁё]/g, "")
             //console.log(allButtons===correct)
              if (allButtons===correct)
              button[i].setAttribute('class','btn-group__answers--wrong')
            }
          }, 
    
    
    getPostImg(){
      this.img = this.postMedia;
    },
    getPreImg(){
      this.img = this.preMedia;
    },
    getAnswer(){ 
           this.getMedia ();    
      let button = document.querySelectorAll('button');
    

      for(let i=0; i<button.length; i++){
        
        let self=this;          
        button[i].addEventListener('click', function(e){
          this.buttonId=e.target.getAttribute('id') ; 
          let answer;
         let correct=self.correctAnswer.replace(/[^A-Za-zА-Яа-яЁё]/g, "")
          
          switch(this.buttonId) {
            case 'first':  // if (x === 'value1')             
              answer  = document.querySelector('#first').innerHTML.replace(/[^A-Za-zА-Яа-яЁё]/g, "") 
            if (answer!==correct )
                document.querySelector('#first').classList.add('btn-group__answers--active')
                 
                 
             
              break;
            case 'second':  // if (x === 'value2')
              answer  = document.querySelector('#second').innerHTML.replace(/[^A-Za-zА-Яа-яЁё]/g, "")
                 if (answer!==correct )
                document.querySelector('#second').classList.add('btn-group__answers--active')
                  
                          
              break;
            case 'third':  // if (x === 'value2')
              answer  = document.querySelector('#third').innerHTML.replace(/[^A-Za-zА-Яа-яЁё]/g, "")
                  if (answer!==correct)
                 document.querySelector('#third').classList.add('btn-group__answers--active')
                   
             
              break;
            case 'fourth':  // if (x === 'value2')
              answer  = document.querySelector('#fourth').innerHTML.replace(/[^A-Za-zА-Яа-яЁё]/g, "")
                             if (answer!==correct)  
                           document.querySelector('#fourth').classList.add('btn-group__answers--active')
                   
               
                break;
            default:
                console.log( "it is arrow button" );
          }  
        
        })  
           
      }
     
     setTimeout(this.getWrong, 500)
      setTimeout(this.reloadManual, 500)
       setTimeout(this.buttonDisable, 500)
    // setTimeout(this. buttonDisable, 1000)
    
     
    },
    
    getMedia ()  {
     
      var self=this
      class DBwork {
        constructor(FirebaseVariable) {
          this.db = FirebaseVariable;
        }

async GetDownloadLink(url) {
              return new Promise(resolve => {
             
            this.db.storage().ref().child(url).getDownloadURL().then(localUrl => {
            //console.log(localUrl);
              resolve(localUrl);
              }).catch(error => {
                resolve("xxx.background.png");
              })
            });
          }

        async LoadQuestions(getlogoFilterToGame) {
          return new Promise(async resolve => {
            let i = self.current;
           
            var Resquestions =[];
           console.log(self.getlogoFilterToGame.questions.length) 
            //while(i<=self.getlogoFilterToGame.questions.length-1){
                var PreMediaLink = await this.GetDownloadLink(self.getlogoFilterToGame.questions[i].preMedia);
                var PostMediaLink = await this.GetDownloadLink(self.getlogoFilterToGame.questions[i].postMedia);
                //console.log(i)
                var temp = {
                    'answers': self.getlogoFilterToGame.questions[i].answers,
                    'penalty': self.getlogoFilterToGame.questions[i].penalty,
                    'points': self.getlogoFilterToGame.questions[i].points,
                    'position': self.getlogoFilterToGame.questions[i].position,
                    'postMedia':PostMediaLink,
                    'postType':self.getlogoFilterToGame.questions[i].postType,
                    'preMedia':PreMediaLink,
                    'preType':self.getlogoFilterToGame.questions[i].preType,
                    'text':self.getlogoFilterToGame.questions[i].text,
                };
                Resquestions.push(temp);
                console.log(Resquestions)
              // i++;

            //} 

            var result = {
                'settings':self.getlogoFilterToGame.settings,
                'questions': Resquestions,
            };
            resolve(result);
        })

    }


}

      
 var variable = new DBwork(firebase);
     variable.LoadQuestions(self.getlogoFilterToGame.settings.name).then(r =>{

 this.$store.commit('SET_MEDIA', r)
     console.log(r)
   
      })

},


  },
   computed:{

     

     styles() {
            return {
              
              
                'background-image': 'url(' + this.defaultBackground + ')',
                'background-repeat': 'round',
                'background-size': 'cover'
            }
        },
  ...mapState([            
         'defaultBackground',
         'media'
    ]),
    logoFilterToVisible() {
      return this.$store.getters.logoFilterToVisible
    },

    getlogoFilterToGame(){
      return this.logoFilterToVisible.filter(ToGameSettings => ToGameSettings.settings.name === this.$route.params.name)[0];
    },

    getlogoFilterToGametAnswer(){
      let arr= this.getlogoFilterToGame.questions[this.current].answers
        arr.sort(function(a, b) {  
          if (a.text > b.text) {
            return 1;
          }
          if (a.text < b.text) {
            return -1;
          }
          // a должно быть равным b
           return 0;
        });
      return arr
    },

    getlogoFilterToGameCorrectAnswer(){
      return this.getlogoFilterToGame.questions[this.current].answers.filter(ToCorrect=>ToCorrect.correct)
    },
    
    getcorrectAnswer(){
      return this.getlogoFilterToGameCorrectAnswer.map(word=>word.text)
    },
    correctAnswer(){
      return this.getcorrectAnswer[0]
    },
    preMedia() {
      return this.$store.getters.preMedia
    },
    postMedia() {
      return this.$store.getters.postMedia
    },
  },
  created: function() {    
  this.$store.dispatch('initLogo')
  
  },
  mounted: function() {
    const userId = firebase.auth();
       
    
   // const media = this.getMedia ();
   /// var el = document.getElementsByClassName("btn-group__answers");
   // el.addEventListener("click", this.getImg, false);



 
  //document.querySelector('#first').addEventListener.addEventListener("click", this.getAnswer); 
  //elem.addEventListener("click", handler2); // Спасибо ещё раз!
    },
  updated: function() {
    console.log('updated');
  },
};
</script>

<style lang="scss">

.header {
  background: transparent;
  
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1920px;
    box-sizing: border-box;
    min-height: 60px;
    padding: 10px 15px;
     margin: auto;
  }
  .main {
    display: flex;
    align-items: center;
    
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    
    padding: 10px 15px;
     margin: auto;
  }

   &__options {
    display: flex;
    align-items: center;
  }
  .circle {
    background-color:rgb(63, 149, 247);
    width: 60px; /* задаете свои размеры */
    height: 60px;
    border-radius: 50%;
    /* не забываем о кроссбраузерности */
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    -khtml-border-radius: 50%;
}
   &__buttonleftarrow {
      position: relative;
    cursor: pointer;
    border: none;
    padding: 0;
    background: transparent;
    color:rgb(207, 5, 5);    
    font-size: 60px;    
    right: 2px;
    bottom:3px;
    
    &:first-child {
      margin-left: 6px;
    }
  }
  &__buttonrightarrow {
      position: relative;
    cursor: pointer;
    border: none;
    padding: 0;
    background: transparent;
    color:rgb(207, 5, 5);    
    font-size: 60px;    
    right: 2px;
    bottom:3px;
    
    &:first-child {
      margin-left: 6px;
    }
  }
    &__buttontimes {
      position: relative;
    cursor: pointer;
    border: none;
    padding: 0;
    background: transparent;
    color:rgb(207, 5, 5);    
    font-size: 60px;    
    left: 3px;
    bottom:3px;
    
    &:first-child {
      margin-left: 6px;
    }
  }
}

.game-card{
  
  
  overflow: hidden;
  
  
    &__preview {
      position: relative;
      display: flex;
      height: 100%;
      height: 100%;
      background: transparent;
      padding: 15px;
      box-sizing: border-box;
       margin: auto;
    }
    &__image {
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
   &__video{
     position: relative;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
width:70%;
    

    }
    &__media {
     
      max-width: 100%;
      max-height: 100%;
      width:70%;
      object-fit: contain;
      
     
   object-fit: scale-down;
           
      background: transparent;
    
    }
    
    &__info {
      padding: 15px;
    }
    &__title {  
      text-overflow: ellipsis;
      display: -webkit-box;  
      -webkit-line-clamp: 4; /* number of lines to show */
      -webkit-box-orient: vertical;
      font-size: 30px;
      align-items: center;
      margin: auto;
     
   
    }
    
}
  .bold {
    font-weight: 800;
    font-size: 40px;
  }
  .colored { 
    font-weight: 800;
    color: rgb(235, 22, 51);
    font-size: 40px;
  }
  .semibold {
    font-weight: 500;
  }


.btn-group {
  display: block; /* Make the buttons appear below each other */
  width: 30%; /* Set a width if needed */
  margin: auto;
    &__answers {
    margin-top: 20px;
    margin-left: 70px;
    padding: 15px 10px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    width: 60%; /* Set a width if needed */
    height:30%;
    font-size: 17px;
    background-color: rgba(110, 102, 102, 0.883);
    color:white;
    border: 1px solid white;
     border-radius: 20px;
    &:hover,
    &--active {
      background-color: rgb(4, 45, 83);
      transition: background 0s;
      
    }
   
    &--wrong {
      background-color: rgb(56, 235, 11);
      transition: background 0s;
      color:rgb(2, 2, 2);
      margin-top: 20px;
      margin-left: 70px;
      padding: 15px 10px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    width: 60%; /* Set a width if needed */
    height:30%;
      font-size: 17px;
      border-radius: 20px;
    }
  }
}
* {
  padding: 0;
  margin: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.b-marquee {
  font-family: 'Segoe UI', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  background: transparent;
  font-weight: 600;
  color: rgb(235, 22, 51);
   cursor: pointer;
    font-size: 20px;

  padding: 10px;
  position: relative;
  margin-bottom: 10px;
}

.b-marquee__text {
  -webkit-animation: animMarquee 60s linear infinite;
  animation: animMarquee 60s linear infinite;
}

@-webkit-keyframes animMarquee {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    
  }
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    
  }
}

@keyframes animMarquee {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
   
  }
  100% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    
  }
}


/* text right to left*/



.b-marquee--rtl .b-marquee__text {
  -webkit-animation: animMarqueeRtl 5s linear infinite;
  animation: animMarqueeRtl 5s linear infinite;
}

@-webkit-keyframes animMarqueeRtl {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
  }
}

@keyframes animMarqueeRtl {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
  


</style>