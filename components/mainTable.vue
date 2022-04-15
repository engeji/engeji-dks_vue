<template>
  <tabs class="all-summ"
    @delete_fn="del_summary({indSumm:$event})"
    @select_tab="setIndSelect({indSumm:$event})" >
    <template v-slot:button>
      <font-awesome-icon 
        class="my-icon add-calc-icon"
        :icon="['fas', 'plus']"
        @click="add_summary"/>
    </template>
    <template v-slot:menu>
      <button class="calc-icon all-calc my-icon">
        <font-awesome-icon :icon="['fas', 'forward']" 
          @click="startCalc" />
      </button>
      <textarea
        class="input-textarea"
        :placeholder="'CTRL+V \nDate | Q | Pin | Pout'"
        rows="1"
        @keyup="set_inputs(indSelectSumm)"
        v-model="inputField"/>
    </template>    
    <tab
      class="one-summ"
      v-for="(summ, indSumm) in summaries" :key="indSumm"
      :name="summ.name"
      :index="indSumm">
        <tabs
          :isRotated="true"
          :default="'default'">
              <template v-slot:menu>
                <button class="calc-icon all-calc my-icon">
                  <font-awesome-icon :icon="['fas', 'play']"
                  />
                </button>
              </template>
          <tab
            v-for="(res,indRes) in summ.results" :key="indRes"
            :name="res.title"
            :index="indRes">
            <table class="table-calc">
              <tr class="row">
                  <th
                  class="header"
                  v-for="(column, c) in [...headers.input, ...headers.calc]"
                  :key="c"
                  >
                  {{ column }}
                  </th>
              </tr>
              <tr class="row" v-for="(row, r) in summ.input" :key="r">
                  <td
                  class="cell"
                  v-for="(cell, c) in [...row, ...res.modes[r]]"
                  :key="c"
                  >
                  {{ cell }}
                  </td>
              </tr>
            </table>
          </tab>
        </tabs>
    </tab>
  </tabs>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import tabs from "@/components/tabs.vue";
import tab from "@/components/tab.vue";
export default {
  sockets: {
    connect() {
      console.log("socket is connetced");
    },
  },
  methods: {
    startCalc() {
      this.summaries.forEach((summ) => {
        this.compos.forEach((comp) => {
          var res = {
            name:comp.name(),
            id:this.getAutoInc,
            title:comp.longName(),
            modes:[]
          };
          summ.results.push(res);

          this.$socket.emit("one_calc", {
            modes: summ.input,
            stages: comp.stages,
            id: res.id,
            compName:res.name,
          });
        });
      });
    },
    ...mapActions("mainTable", ["get_headers"]),
    ...mapMutations("mainTable", [
      "set_inputs",
      "add_summary",
      "setIndSelect",
      "del_summary",
      "setBuffer",
      "incCounter",
      
    ]),
  },
  components: { tab, tabs },

    computed: {
    ...mapState("mainTable", [
      "headers",
      'indSelectSumm',
      "buffer",
      "summaries",
      "currentCounter"
    ]),
    ...mapState("compos", ["compos"]),
    ...mapGetters("mainTable",["getAutoInc"]),
      inputField:{
        get(){
          return this.buffer
        },
        set(value){
          this.setBuffer({value});
        }
      }
  },
  updated() {
    this.set_inputs();
  },
  created() {
    this.get_headers();
    this.add_summary();
  },
};
</script>

<style>



  
.add-calc-icon{
  font-size: 100%;
}

.calc-icon {
  max-width: 100%;
}
.table-calc { border-collapse: collapse;}

.table-calc td, .table-calc th{ border: 1px solid lightgrey;}
.table-calc td, .table-calc th{ border: 1px solid lightgrey;}
.table-calc td, .table-calc th{ border: 1px solid lightgrey;}


.table-calc tr:nth-child(even){ background:#fff;}

.cell {
  text-align: center;
}

textarea {resize: none;}

.header {
  font-size: 10px;
  height: max-content;
  width: min-content;
  word-wrap: break-word;
  break-after: always;
}


</style>
