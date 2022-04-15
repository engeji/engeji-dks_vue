<template>
  <div class="wrapper-gdh"
    v-if="compos.length > 0">
    <div class=""
      v-for="(stage,indStage) in compos.filter(x => x.isCalc)[0].stages" :key="indStage">
      <tabs class="tabs"
        :hasClose="false"
        :isRotated="true">
        <tab class="tab"
          :name="'ГДХ  '"
          :index="0">
          <my-scatter 
            :name="stage.name"
            :datacollection="stage.curveData.gdh"
            :title="[
                `Газодинамическая характеристика компрессора ${stage.name},`,
                `расчетные параметры: z=${stage.curveData.z_avg}`,
              ]"
            />
        </tab>
        <tab class="tab"
          :name="'ГДХ, б.м.'"
          :index="1">
          <my-scatter 
            :name="stage.name"
            :datacollection="stage.curveData.no_dim"
            :title="[
                `Газодинамическая характеристика компрессора ${stage.name},`,
                `расчетные параметры: z=${stage.curveData.z_avg}`,
              ]"
            :pointRadius="1"
            :lineIsShown="false"
            />
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
import tabs from "@/components/tabs.vue";
import tab from "@/components/tab.vue";
import { mapState } from "vuex";
import myScatter  from "@/components/myScatter.vue";
export default {
  data(){
    return {

    }
  },
  components:{myScatter, tab, tabs},
  computed:{
    ...mapState('compos',['compos']),

  },
};
</script>

<style >
.wrapper-gdh {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  overflow-x: auto;
}
.tab {
  width: 480px;
}

</style>

