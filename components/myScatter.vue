<template>
  <!-- <div class="graph"> -->
    <scatter
    class="scatter-inner"
    :chartdata="datacollection"
    :style="scatterStyle"     
    :options="myoptions"> </scatter>
  <!-- </div> -->
</template>

<script>
import Scatter from "./mixins/Chart.js";
export default {
  props: {
    title: {},
    datacollection: {},
    pointRadius:{default:0},
    lineIsShown:{default:true},
  },
  components: { Scatter },
  data() {
    return {
      myoptions: {
        responsive: true,
        plugins:{
          datalabels:{
            formatter({label}){
              return label != '' ?
                (label == undefined ?
                  null:
                  label):
                null
            },
            padding:-1,
            color:'black',
            backgroundColor:'white',
            display:'auto',
            clamp: true,
            font:{
              weight:"bold",
              size:14,
            },
          },
        },
        scales:{
          xAxes:[{
            ticks:{
              min: 0,
              stepSize: 20,
            },
          }],
          yAxes:[{
            ticks:{
              min: 0,
              stepSize:0.02,
            },
          }],
        },
        legend:{
          display:false,
        },
        title:{
          text: this.title,
          display: true,
        },        
        datasets:{
          scatter:{
            borderColor: 'black',
            borderWidth: 3,
            showLine: this.lineIsShown,
            fill: false,
          },
        },
        elements: {
          point: {
            radius: this.pointRadius,
          },
        },
      },
    };
  },
  methods:{
    get_borderVal(func, axesName){
      return func(... this.datacollection.datasets
      .map(x => func(...x.data.map(xx => xx[axesName]))))
    },
  },
  computed:{
    scatterStyle(){
      return {
        height:'100%',      
        width: '100%',
        position:'relative',
      }
    },    
  },
  created(){
    // const minX = this.get_borderVal(Math.min,'x') * 0.8
    // const maxX = this.get_borderVal(Math.max,'x') * 1.1
    const minY = this.get_borderVal(Math.min,'y') * 0.95
    const maxY = this.get_borderVal(Math.max,'y') * 1.05

    // this.myoptions.scales.xAxes[0].ticks.min=minX - minX % 20
    this.myoptions.scales.yAxes[0].ticks.min=minY - minY % 0.05

    // this.myoptions.scales.xAxes[0].ticks.max=maxX - maxX % 20
    this.myoptions.scales.yAxes[0].ticks.max=maxY - maxY % 0.05
    
    const facil = {
        "kpd":{
          align: -90,
        },
        "freq":{
          align: -180,
        },
        "mght":{
          align: 45,
          borderWidth: 1,
        },
        "nodim_nap":{}
      };

    this.myoptions.plugins.datalabels.align = function({dataset}){
      return facil[dataset.my_type].align
    };

    this.datacollection.datasets = this.datacollection.datasets
      .map(element => Object.assign(element,facil[element.my_type]))
  }   
}
</script>

<style>
.graph {
  background: white;    
}
.scatter-inner {
 
}
</style>
