
<template>
  <div>
    <Header :hasHeader="header"/>
    <Preloader :data="true"/>
    <div class="wrapper">
      <div class="filters">        
        <div class="filters__col">
          <Input />
        </div>
      </div>
      <nav class="tabsNav">
        <router-link to="/all" >
          <button class="tabsNav__button">Все</button>
        </router-link>
        <router-link to="/favorites" >
          <button class="tabsNav__button">Избранные</button>
        </router-link>
        <router-link to="/mine" >
          <button class="tabsNav__button">Мои</button>
        </router-link>
        <router-link to="/downloaded" >
          <button class="tabsNav__button">Загруженные</button>
        </router-link>
        <router-link to="/created" >
          <button class="tabsNav__button tabsNav__button--active">Создать</button>
        </router-link>
      </nav>     
      <div class="create-container">
        <div class="item-block" v-show="show_1">
          <Input label="Введите название игры" @input-changed="getDescription" />
          <button @click="boom">Продолжить</button>
        </div>  
        <div class="item-block"  v-show="show_2">
          <Input label="Введите описание игры" @input-changed="getName" />
          <button @click="tram">Продолжить</button>
        </div>
        
        <div class="item-block" v-show="show_3">  
          <label>Аватар игры
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>
          <button v-on:click="upload()">Создать игру</button>        
        </div>    
    </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import Input from "../components/Input";
import GameCard from "../components/GameCard";
import Preloader from "../components/Preloader";
import { mapState} from 'vuex'; 
import firebase from 'firebase';
export default {
    name: "Create",
    components: {
        Header,
    Input,
    
    Preloader
    },
    props: {},
    data: function () {
        return {
            header: true,
            show_1: true,
            show_2:false,
            show_3: false,
            file: '',
            // add  document to the games collection
            blocked:true,
            clientUid:'',
            description:'',
            likes:[],
            logo:null,
            logos:[],
            music:'',
            name:'',
            played:0,
            soundless:false,
            visible:false,
            //end of document
            // add  document to the questions collection
            answers:[],
            penalty:0,
            points:0,
            position:0,
            postMedia:null,
            postType:0,
            preMedia:null,
            preType:0,
            text:'',
             //end of document
        }
    },
    methods:{
      getName: function (value){
        this.name = value;
      },
      getDescription: function (value){
        this.description = value;
      },
      boom(){
        console.log('Чпоок1!')
         this.show_1 = false;
         this.show_2 = true;
      },
      tram(){
        console.log('Чпоок2!')
         this.show_1 = false;
         this.show_2 = false;
         this.show_3 = true;
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
        //https://cloud.google.com/firestore/docs/quickstart-mobile-web
        upload(){
        //https://firebase.google.com/docs/storage/web/upload-files?hl=ru
            var storage = firebase.storage();
            var storageRef = storage.ref();
            //var file = '...'
                       var metadata = {
    'contentType': this.file.type
  };

            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('games/' + this.file.name).put(this.file, metadata);

            var that=this;
            // File or Blob named mountains.jpg
            

            // Create the file metadata

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running...');
                     break;
                }
            }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                         console.log('User does not have permission to access the object')
                    break;

                    case 'storage/canceled':
                         console.log('User canceled the upload')
                    break;   

                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect error.serverResponse')
                    break;
                }
            }, function() {
                console.log('Upload completed successfully, now we can get the download URL')
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });
           
        }
             
    },
    computed:{
    //...mapState([            
    //'acunte'            
    //]),       
    },
    created: function() {    
    //this.$store.dispatch('initAcunte')    
    },
     mounted: function() {
  const userId = firebase.auth();
    console.log(userId);
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
.settings {
        display: flex;
        flex-wrap: wrap;
        
        &__item {
            box-sizing: border-box;
            width: 50%;
            padding: 15px;
        }
}
.create-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .item-block {
    display: flex;
    flex-direction: column;
    button {
      //color: #009688;
      color:#cb3837;
      font-size: 14px;
      outline: none;
      border: none;
      background: none;
      text-transform: uppercase;
      font-weight: 500;
      line-height: 34px;
      cursor: pointer;
    }
  }
}
</style>