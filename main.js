import Vue from "vue";
import App from "./App.vue";
import {store} from "./store";
import {library} from "@fortawesome/fontawesome-svg-core"
import {faWindowMinimize, faPlus, faMinus, faMinusCircle, faPlay, faPlusCircle, faForward, faStepForward, faCopy, faLayerGroup, faCheck, faTimes, faCircle, faDotCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

library.add(faWindowMinimize,faPlus,faMinus,faMinusCircle, faPlay,faPlusCircle,faForward,faStepForward,faCopy,faLayerGroup,faCheck,faTimes,faCircle, faDotCircle);
Vue.component('font-awesome-icon',FontAwesomeIcon);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");



Vue.config.productionTip = true;

Vue.use(new VueSocketIO({
  debug:true,
  connection:SocketIO('http://10.7.109.141:5000'),
  vuex:{
    store,
    actionPrefix:"SOCKET_",
    mutationPrefix :"SOCKET_",
  }
}));

