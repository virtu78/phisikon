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
  methods: {
    getMail: function (value) {
      this.email = value;
    },

    getUrl: function (value) {
      this.link = value;
    },

    sendEmail: function() {
      const options = {
        handleCodeInApp: true,
        url: 'https://historical-9258a.firebaseapp.com/signIn'
      };
      firebase.auth().sendSignInLinkToEmail(this.email, options)
        .then((response) => {
          this.stepls
                  
           })
           .catch(() => this.error = 'Аккаунт не найден, обратитесь к разработчику');
          
       
        
    },

    sendUrl: function() {
      firebase.auth().signInWithEmailLink(this.email, this.link)
        .then((response) => {
          if( response ) this.$router.replace('games')
        })
        .catch(() => this.errorUrl = 'Неправильная ссылка');
    }
    
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
     // color: #009688;
    color: #cb3837;
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

