import { Scatter } from "vue-chartjs";
import  ChartJSPluginDatalabels  from "chartjs-plugin-datalabels";

export default {
  extends: Scatter,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.addPlugin(ChartJSPluginDatalabels);
    this.renderChart(this.chartdata, this.options);
  },
};
