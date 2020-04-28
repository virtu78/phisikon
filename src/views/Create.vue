
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
          <button class="tabsNav__button tabsNav__button--active">Избранные</button>
        </router-link>
        <router-link to="/mine" >
          <button class="tabsNav__button">Мои</button>
        </router-link>
        <router-link to="/downloaded" >
          <button class="tabsNav__button">Загруженные</button>
        </router-link>
      </nav>
      <div class="wrapper">
      <div class="create">
        <div class="settings__item">
          <Input label="Game name is here" />
        </div>

        <div  class="settings__item">
          <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>
          <button v-on:click="uploadQuestuion()">Submit</button>        
        </div>
        <div class="settings__item">
          <Input label="Question is here" />
        </div>
        <div class="settings__item">
          <Input label="first answer is here" />
        </div>
        <div class="settings__item">
          <Input label="second answer is here" />
        </div>
         <div class="settings__item">
          <Input label="third answer is here" />
        </div>
         <div class="settings__item">
          <Input label="fourth answer is here" />
        </div>
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
            file: '',
        }
    },
    methods:{
        handleFileUpload(){
          this.file = this.$refs.file.files[0];
        },
        uploadQuestuion(){
        //https://firebase.google.com/docs/storage/web/upload-files?hl=ru
            var storage = firebase.storage();
            var storageRef = storage.ref();
            //var file = '...'
                        var metadata = {
                contentType: 'image/png'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef.child('logo/' + this.file.name).put(this.file, metadata);

           
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
.settings {
        display: flex;
        flex-wrap: wrap;
        
        &__item {
            box-sizing: border-box;
            width: 50%;
            padding: 15px;
        }
}
</style>