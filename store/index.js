import Vue from 'vue'
import Vuex from 'vuex'
import mainTable from './modules/mainTable.js';
import limits from './modules/limits.js';
import compos from './modules/compos.js';
import base from './modules/base.js';
import graph from './modules/graph';

Vue.use(Vuex);

export const store = new Vuex.Store({
    
    modules: {
        mainTable, compos, base, graph, limits
    }
});
