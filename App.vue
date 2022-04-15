<template>
  <div id="app">
    <div class="wrapper">
      <baseSPCH/>
      <transition name = 'slide'>      
        <div class="side"
         @mouseleave="hideManage"
         v-if="showManage">
          <button class="show-btn"
            @click="lockManage"
            >Управление</button>
          <div  class="settings" ><settings/></div>
        </div>        
      </transition>
      <transition name = 'slide'>
        <div class="side"
          v-if="!showManage">
            <button class="show-btn2"
              @mouseover="hideManage">
              Управление
            </button>
        </div>
      </transition>
      <compos class="compos"/>
      <mainTable class="tableRes"/>
      <gdh class="GDH"/>
    </div>
  </div>
</template>


<script>
import mainTable from "@/components/mainTable.vue";
import compos from "@/components/compos.vue";
import gdh from "@/components/GDH.vue";
import baseSPCH from "@/components/base.vue";
import settings from "@/components/settings.vue";
import {mapState,mapMutations,mapGetters, mapActions} from 'vuex';
export default {    
    components:{
      mainTable, compos, baseSPCH, settings, gdh
    },
    data(){
      return {
      }
    },
    computed:{
      ...mapState("limits", ["borders"]),
      ...mapGetters('limits',['showManage'])
    },
    methods:{
      ...mapMutations("limits", ["hideManage","lockManage"]),
      ...mapActions("limits", ["setDefaultLimits"]),
      hideSide(){
        this.hideManage();
      }
    },
    created(){
      this.setDefaultLimits();   
    },

}
</script>

<style>

.side {grid-area: side}
.hande {grid-area: hande}
.compos {grid-area: compos}
.tableRes {grid-area: tableRes}
.GDH {grid-area: GDH}
.settings {grid-area: settings}
.base {grid-area: base}
.show-btn {grid-area: show-btn}

.place-holder {
    height: 100%;
    width: 100%;
    text-align: center;
    color: rgba(0, 0, 0, .5);
    cursor: pointer;   
}
.compos{
  overflow-y:auto;
}

.my-icon {
   color:lightslategray;
   cursor: pointer;
 }

.no-select {    
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
}


*{
  padding: 0;
  margin: 0;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.wrapper {
  display: grid;  
  width: 100vw;
  height: 100vh;
  grid: 
    "side             GDH  compos   compos   " auto     
    "side             GDH  tableRes tableRes " 3fr 
   / min-content      auto 1fr      1fr      
  ;
  background-color:rgb(40, 24, 185);
  column-gap:10px;
  row-gap:10px;
  
}

.side {
  display: grid;
  grid:
    "show-btn" auto
    "settings" 10fr
  /auto  
  ;  
}

.side, .tableRes, .GDH, .compos {background-color: rgb(195, 221, 243)  }

.tableRes {
  overflow-x: auto;
}

.show-btn2{
  writing-mode:sideways-lr;
  width: 30px;
  height: 120%;
}

.show-btn {
  width: 300px;
}
.slide-enter-active {
  transition: all .1s ease;
}

.slide-leave-active {
  transition: all .1s ease ;
}

.slide-enter, .slide-leave {  
  transform:translateX(-100px);  
}

    
.close {
    text-align: center;
    width: 60px;    
    color: white;
    background-color: rgba(128, 128, 128, .5);
    border: none;
    justify-self: end;
    font-weight: bolder;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    display: grid;
}
.close:after{
    content: "\274c";
    font-size: 14px;
}

.close:hover {
    background-color: red;
}

</style>

