<template>
  <div class="login-container">
    <div class="login-block" v-show="step_1">
      <Input label="Почта" @input-changed="getMail" :error="errorMail"/>
      <button @click="sendEmail">Продолжить</button>
    </div>
    <div class="login-block" v-show="step_1 == false">
      <Input label="Ссылка" @input-changed="getUrl" :error="errorUrl"/>
      <button @click="sendUrl">Вход</button>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input";
import Vuex from 'vuex';
import { mapState} from 'vuex'; 
import firebase from 'firebase';

export default {
  name: "Login",
  components: {
    Input
  },
  props: {},
  data: function () {
    return {
      userId: null,
      email: null,
      hasError: false,
      step_1: true,
      errorMail: '',
      errorUrl: '',
      link: null
    }
  },
  computed: {
  ...mapState({
    
  }),


},
  methods: {
    getMail: function (value) {
      this.email = value;
    },

    getUrl: function (value) {
      this.link = value;
    },

    sendEmail: function() {
      //Проверка на то, прошел ли пользователь по ссылке
      var actionCodeSettings = {
          handleCodeInApp: true,
          url: 'https://historical-9258a.firebaseapp.com/signIn'
         // url: 'https://bitvaumov-4a5e6.firebaseapp.com/signIn'
          
      };
      firebase.auth().sendSignInLinkToEmail(this.email,  actionCodeSettings)
        .then((response) => {
          //Класс для работы с Firebase
          class DBwork {
            constructor(FirebaseVariable) {
             this.db = FirebaseVariable;
          }
            UserExistCheck(email) {
              return new Promise(resolve => {
                this.db.auth().fetchSignInMethodsForEmail(email).then(r => {
                  r.length>0?resolve(1):resolve(-1);
                });
              })
            }
          }
          var that=this;
          var variable = new DBwork(firebase);
          //Eсли пользователь зарегистрирован - вернет 1, если нет:-1
          variable.UserExistCheck(this.email).then(function (res) {
            console.log(res)
            if(res===1){that.step_1 = false
            } else {
              that.errorMail = 'Аккаунт не найден, обратитесь к разработчику'}}); 
        }).catch(() => {
         this.errorMail = 'Ошибка в заполнении адреса эл. почты'
          console.log('error')})    
    },
      sendUrl: function (){    
      firebase.auth().signInWithEmailLink(this.email, this.link)
        .then((response) => {
          if( response ) this.$router.replace('games')
          
         
        })
        .catch(() => this.errorUrl = 'Неправильная ссылка');
    }

  },
  mutations: {


},
  mounted: function() {

  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-block {
    display: flex;
    flex-direction: column;
    button {
      color: #009688;
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
