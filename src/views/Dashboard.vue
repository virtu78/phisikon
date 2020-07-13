<template>
  <div>
    <Header @rubbonus-changed='toogle($event)'  :hasHeader="header"/>
    <Preloader :data="true"/>
    <div class="wrapper">
      <div class="dashboard">
      <div class="filters">
        <div class="filters__col">
          <select v-model="selectedSubject">
            <option>Все предметы</option>
            <option>Алгебра</option>
            <option>Английский язык</option>
            <option>Биология</option>
            <option>География</option>
            <option>Геометрия</option>
            <option>Демо-версия</option>
            <option>Информатика</option>
            <option>История</option>
            <option>Литература</option>
            <option>Математика</option>
            <option>Обществознание</option>
            <option>Окружающий мир</option>
            <option>Робототехника</option>
            <option>Русский язык</option>
            <option>Физика</option>
            <option>Химия</option>
          </select>
        </div>
        <div class="filters__col">     
          <select v-model="selectedGenre">
            <option>Все жанры</option>
            <option>Демо</option>
            <option>Задачник</option>
            <option>Подготовка к ВПР</option>
            <option>Подготовка к ЕГЭ</option>
            <option>Рабочая тетрадь</option>            
          </select> 
        </div>
        <div class="filters__col">         
          <select v-model="selectedGrade">
            <option>Все классы</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>       
          </select>                
        </div>
        <div class="search__options">
          <button disabled:true class="icon" @click='searschbyTitle'>
            <font-awesome-icon  icon="search" />
          </button>
          <Input label="" @input-changed='getSearch' />          
        </div>
      </div>     
        <div  class="games">          
          <Card  v-for="(imumkitem, index) in  filteredImumkItems" :clickRubBonus="clickRubBonus" :imumkitem="imumkitem" :key="index"  class="games__item" />        
        </div>
        </div>      
      </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import Input from "../components/Input";
import Card from "../components/Card";
import Preloader from "../components/Preloader";
import Vuex from 'vuex';
import { mapState} from 'vuex';

export default {
  name: "Dashboard",
  components: {
    Header,
    Input,
    Card,
    Preloader
  },
    props: {} ,  
  data: function () {
    return {
      header: true,   
      selectedSubject: "Все предметы",
      selectedGenre:"Все жанры",
      selectedGrade: "Все классы",      
      search: null,
      
      clickRubBonus:false,
    }
  },
  methods: {
    toogle(x){           
      this.clickRubBonus=x
      
      //console.log(this.clickRubBonus);   
    },
    getSearch(value) {
      this.search = value.toLowerCase(); 
      (this.search.length == 0) ? 
      this.search=null :         
      this.search = value.toLowerCase(); 
      
    },
    searschbyTitle(){
      console.log(this.search)       
    }
    
  },
  computed:{
 ...mapState({  
    imumkitems: state => state.imumkitems
  }),
    
    arrUnique() {
      const copy = []
      Array.from(this.imumks).forEach((itm,i) => {
      itm.tagList = this.nwimmk[i].tagList
      copy.push(itm)
      })
    return copy       
    },
    nwimmk() { 
      let str, heading,      
       newimmk=[]      
      for (let i=0; i<this.titles.length; i++){
        str=this.titles[i].replace(/[,.-]/g, ' ');
        heading=str.replace(/\s+/g,' ' ) // заменить длинные пробелы одним
        .replace(/^\s/,'')    // удалить пробелы в начале строки
        .replace(/\s$/,'');   // удалить пробелы в конце строки
        let separator = /\s* \s*/;
        let tagList = heading.split(separator);
        let obj={tagList};       
         newimmk.push(obj);            
      }       
       return newimmk       
      },
    imumks(){      
      return this.$store.getters.getimumk
    },
    subject() {
      return this.$store.getters.getSubject
    },
    genre() {
      return this.$store.getters.getGenre
    },
    grade() {
      return this.$store.getters.getGrade
    },
    titles(){
      return this.$store.getters.getTitle
    },    
    immkToSbjct() {      
      return this.arrUnique.filter(item => item.subject === this.selectedSubject)     
    },
    immkToGnr(){      
      return this.arrUnique.filter(item => item.genre === this.selectedGenre)
    },
    immkToGrd(){      
      return this.arrUnique.filter(item => item.grade === this.selectedGrade)
    },
    threeFilters(){
      let  j= this.immkToSbjct.filter(l => l.genre === this.selectedGenre)
      return  j.filter(k => k.grade === this.selectedGrade)
    },
    filteredImumkItems(){         
      let immk;  
       
      immk = (this.selectedSubject !=='Все предметы' && this.selectedGenre =='Все жанры' && this.selectedGrade =='Все классы') ? 
          this.immkToSbjct :
        (this.selectedSubject =='Все предметы' && this.selectedGenre !=='Все жанры' && this.selectedGrade =='Все классы') ?
          this.immkToGnr :        
        (this.selectedSubject =='Все предметы' && this.selectedGenre =='Все жанры' && this.selectedGrade !=='Все классы') ?
          this.immkToGrd:
        (this.selectedSubject !=='Все предметы' && this.selectedGenre !=='Все жанры' && this.selectedGrade =='Все классы') ?
          this.immkToSbjct.filter(x => x.genre === this.selectedGenre) :           
        (this.selectedSubject !=='Все предметы' && this.selectedGenre =='Все жанры' && this.selectedGrade !=='Все классы') ?               
          this.immkToSbjct.filter(y => y.grade === this.selectedGrade) :
        (this.selectedSubject =='Все предметы' && this.selectedGenre !=='Все жанры' && this.selectedGrade !=='Все классы') ? 
          this.immkToGnr.filter(z => z.grade === this.selectedGrade) :     
        (this.selectedSubject !=='Все предметы' && this.selectedGenre !=='Все жанры' && this.selectedGrade !=='Все классы') ? 
          this.threeFilters :  
        (this.search !== null) ? 
          this.arrUnique.filter(itm=>itm.tagList.find(p=>p.toLowerCase()=== this.search)) :         
        this.arrUnique;       
      return immk
    }    
  },
  created: function() {    
    this.$store.dispatch('initImumkItems')
  },
  
  };
</script>
<style lang="scss" scoped>
.wrapper {
    position: absolute;
    background-attachment: scroll ;
    min-height:100%;
    min-width: 100%;   
    background: linear-gradient(to top, #f1f1f1, #828282);
}
.dashboard{
  position: relative;
    margin:  2% 0  0 10%;      
}
.search {
 // background: #009688;
 background: #000000;
  box-sizing: border-box;
  
  &__options {
    
    display: flex;
    align-items: center;
  
  }
}
.filters {
  display: flex;
  &__col {
    padding: 10px;
    width: 20%;
  }
}
.icon{
  position:relative;
  right:10px;
}
.games {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  padding: 7.5px;
   width:100%; 
  &__item { 
    background-color:rgb(255, 255, 255);    
    box-sizing: border-box;
   min-width: 16%;
    
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
   &__active {
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
      background-color:rgb(153, 156, 156);
    }
}
</style>
