<template>
  <div>
    <Header :hasHeader="header" />
    <div class="wrapper">
      <div class="settings">
        <div  class="settings__item">
          <Input label="Почта" />
        </div>
        <div class="settings__item">
          <Input label="Ключ устройства" />
        </div>
        <div class="settings__item">
          <Input label="Окончание срока действия тарифа" />
        </div>
        <div class="settings__item">
          <Input label="Дата блокировки" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Input from "../components/Input";
import { mapState} from 'vuex'; 
export default {
  name: "Settings",
  components: {
    Header,
    Input
  },
  props: {},
  data: function () {
    return {
      header: false,
    }
  },
  computed:{
    ...mapState([
            
            'acunte'
            
        ]),
       
  },
  created: function() {
    
    this.$store.dispatch('initAcunte')
    
   },
};
</script>

<style lang="sass" scoped>
    .settings
        display: flex
        flex-wrap: wrap
        &__item
            box-sizing: border-box
            width: 50%
            padding: 15px
            
</style>