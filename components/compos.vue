<template>
  <div class="wrapper-compos">
    <div class="one-comp" v-for="(comp, indComp) in compos" :key="indComp">
      <div class="comp-panel">
        <div class="comp-label no-select">
          {{ comp.name() }}
        </div>
        <div class="btns">
          <div class="minimize">
            <font-awesome-icon
              class="minimize-icon place-holder"
              :icon="['fas', 'window-minimize']"
              @click="setCalcComp({indComp})"/>
          </div>
          <div class="close"
            @click="delComp({indComp})"></div>
        </div>
      </div>
      <div class="comp-wrapper" v-if="comp.isCalc">
        <div class="range" v-for="(stage, i) in comp.stages" :key="i">
          <input
            class="spch-track"
            type="range"
            :max="
              Math.round(
                stage.fnom * borders.filter((x) => x.key == 'freq_max')[0].value
              )"
            :min="
              Math.round(
                stage.fnom * borders.filter((x) => x.key == 'freq_min')[0].value
              )"
            v-model.number="stage.curFreq"
          />
        </div>
        <div class="all-stages">
          <div
            class="stage"
            v-for="(spch, indStage) in comp.stages"
            :key="indStage">
            <spchBoxes
              :title="spch.short_name"
              :cnt.sync="spch.cnt"
              @del="delStage({indComp,indStage})"
              @set="setSpchAct({indComp,indStage})"
              @inc="spch.cnt++"
              @dec="spch.cnt--"
              @change="spch.cnt = $event"/>
          </div>
          <font-awesome-icon
            class="place-holder add-spch"
            :icon="['fas', 'plus-circle']"
            @click="addSpchAct({ indComp })"/>
        </div>
      </div>
    </div>
    <font-awesome-icon
      class="place-holder add-comp"
      :icon="['fas', 'plus-circle']"
      @click="addCompAct"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import spchBoxes from "@/components/spchBoxes.vue";
export default {
  components: { spchBoxes },
  computed: {
    ...mapState("compos", ["compos", "compObj"]),
    ...mapGetters(["borders"]),
  },
  methods: {
    ...mapActions("compos", ["addSpchAct","addCompAct","selectSPCH","setSpchAct"]),
    ...mapMutations("compos", ["delComp","setCalcComp","delStage"]),
  },
  created() {
    // this.compos.push(this.compObj);
  },
};
</script>

<style>

.minimize:hover {
  background-color: rgba(128, 128, 128, .5);
}
.minimize {
  display: grid;
  justify-content: center;
  padding-inline: 10px;
}

.btns {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1px;
}
.wrapper-compos {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 25px;
}
.add-spch {
  justify-self: right;
}
.stage {
  display: grid;
  justify-self: center;
  width: 100%;
  border: 2px solid gray;
  border-radius: 1px;
}

.comp-label {
  justify-self: center;
  align-self: center;
}

.comp-panel {
  background-color:lightskyblue;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-content: stretch;
  height: 30px;
}
.one-comp {
  justify-self: center;
  width: 95%;
  border: 3px solid gray;
  border-radius: 1px;
}
.all-stages {
  display: grid;
  padding: 5px;
  grid-auto-flow: column;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 7px;
}
.add-comp,
.add-spch {
  font-size: 50px;
  justify-self: center;
  color: rgba(42, 42, 42, 0.2) !important;
}

.spch-track {
  width: 100%;
}

input[type="range"]::-moz-range-track {
  height: 100%;
  background-color: white;
}

input[type="range"]::-moz-range-thumb {
  height: 60%;
  width: 0%;
}

input[type="range"]::-moz-range-progress {
  background-color: lightskyblue;
  height: 60%;
}
</style>
