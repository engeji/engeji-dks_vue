import axios from 'axios';

const state = () => ({
    headers: {
        input:[
            "Дата",
            "Расход, млн. м3/сут",
            "Давление входа, МПа",
            "Давление выхода, МПа",
        ],
        calc:[]        
    },
    summaries:[],
    buffer: "",
    indSelectSumm:0,
    currentCounter:0,
});

const mutations = {
    setBuffer:(state,{value}) => state.buffer = value,
    set_headers:(state, payload) => state.headers.calc=payload,
    setIndSelect:(state, {indSumm}) => state.indSelectSumm = indSumm,
    set_inputs:(state, payload) => {
        if (payload != undefined) {
            if (state.buffer != '') {
                var data = state.buffer.split('\n').map(x => x.split('\t')).slice(0,-1);
                state.buffer = '';
                state.summaries[payload].input.push(...data);
                state.summaries[payload].results.find(x => x.name == 'default')
                .modes.push(...data.map(() => state.headers.calc.map(() => '-')))
            }
        }
    },
    add_summary(state){
        return state.summaries.push({
            results:[{
                name:'default',
                title:'default',
                modes:[],
                id:9999
            }],
            input:[],
            name: "Расчет №" + (state.summaries.length+1)
        });
    },
    del_summary:({summaries},{indSumm}) => summaries.splice(indSumm,1),
    "SOCKET_push_sol":({summaries}, {id,sol}) => summaries.map(summ => summ.results.find(x => x.id == id).modes.push(sol)),
    incCounter:(state) => state.currentCounter++,
};

const getters = {
    getAutoInc(state){
        mutations.incCounter(state);
        var allResults = state.summaries.map(xx =>xx.results).reduce((a,b) => a.concat(b));
        if (allResults.some(x => x.id == state.currentCounter)) {
            return this.getAutoInc(state);
        }
        else {
            return state.currentCounter;
        }
    },
};
const actions = {
    get_headers:({commit}) => {
        const path = 'http://10.7.109.141:5000/headers';        
        axios.get(path)
        .then((res) => {                    
            commit('set_headers', res.data.headers);
        })
        .catch((error) => {
            console.error(error);
        });  
    },
};

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
};