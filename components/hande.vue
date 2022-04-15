<template>
  <div class="hande-wrapper">
    <tabs class="compos"
      :contentColor="'rgb(195, 221, 243)'">
      <template v-slot:button>
        <input class="add-calc" type="button" value="+"
        @click="showModal({method:addSpch,payload:{index:allComp.length}})">
      </template> 
      <tab class="one-comp"
        v-for="(comp,indComp) in allComp"
        :key="indComp"
        :name="comp.name()"
        :indexMainComp="indComp"
        :index="indComp">
        <div class="all-stages">
          <div class="one-stage"
            v-for="(spch,index) in comp.stages" 
            :key="index">
            <input class="spch-freq"
              v-model="spch.curFreq" type="text">
            <input                               
              :max="spch.fnom * borders
                  .filter(x => x.key == 'freq_max')[0].value"
              :min="spch.fnom * borders
                  .filter(x => x.key == 'freq_min')[0].value"
              v-model.number="spch.curFreq"
              type="range"
              class="spch-track">
            <div class="spch-label no-select">{{spch.title}}</div>
            <div class="close del-stage"
              @click='comp.stages.splice(index,1)'/>
            <input v-model.number="spch.cnt" type="text" class="spch-cnt">            
            <input class="spch-low-btn" 
              @click="spch.curFreq--" type="button" value="<">
            <input class="spch-high-btn"
              @click="spch.curFreq++" type="button"  value=">">
          </div>
          <font-awesome-icon class="place-holder"
            :icon="['fas','plus-circle']"
            @click="showModal({method:comp.addSpch,payload:{}})"/>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import tabs from "@/components/tabs.vue";
import tab from "@/components/tab.vue";
export default {
  components:{tabs, tab}, 
  computed:{
    ...mapGetters('compos',[
        'allComp'       
    ]),
    ...mapGetters([
           'borders'
       ]),
  },
  methods:{
    ...mapMutations('compos',[
            'addSpch',
            'changeSPCH',
            'pressCheck'

        ]),
        ...mapMutations('base',[
            'showModal',
            'hideModal'
        ]),        
  }

}
</script>

<style>
.place-holder {
  font-size: 50px;
  justify-self: center;
  color: rgba(42, 42, 42, .2) !important;
}
.one-comp {
  width: 100%;
}
.all-stages {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  grid-template-columns: repeat(3,3fr) 1fr;
  height: 100%;
}
.one-stage {
  display: grid;
  grid:
  "spch-label   spch-label spch-cnt   spch-cnt   spch-freq  del-stage"     20px
  "spch-low-btn spch-track spch-track spch-track spch-track spch-high-btn" 30px
  /1fr          2fr        2fr        2fr        2fr        1fr
  ;
  border: 2px groove black;  
}
.del-stage {grid-area: del-stage;}
.spch-label {grid-area: spch-label;}
.spch-freq {grid-area: spch-freq; }
.spch-track {grid-area: spch-track; }
.spch-cnt {grid-area: spch-cnt; }
.spch-low-btn {grid-area: spch-low-btn; }
.spch-high-btn {grid-area: spch-high-btn; }

.spch-label {
  text-align: center;
  background-color: rgb(255, 254, 254);
}
input[type="range"]::-moz-range-track {   
    height: 100%;
    background-color: lightgray;
    
}

input[type="range"]::-moz-range-thumb{  
    background-color:unset;
    height: 60%;
    width: 0%;  
}

input[type="range"]::-moz-range-progress{
    background-color:lightskyblue;
    height: 60%;
}

</style>