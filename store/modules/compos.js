import axios from 'axios';


const enums = Object.freeze({
    ADD_SPCH:'addSpch',
    SET_SPCH:'setSpch',
    ADD_COMP:'addComp',
});


const state  = () => ({
    compos:[], 
    indComp:-1,
    indStage:-1,
    curentMode: enums.ADD_COMP,
});

const getters = {
    lengthCompos:(state) => state.compos.length,
};

const mutations = {  
    delStage(state,{indComp, indStage}){
        if (state.compos[indComp].stages.length == 1) {
            state.compos.splice(indComp,1);
        }
        else {
            state.compos[indComp].stages.splice(indStage,1);
        }    
    },
    addSpch(state, {spch, curve}){    
        state.compos[state.indComp].stages.push({
            ...Object.assign({}, spch),
            curveData: curve,
            cnt: 1,
            curFreq: + spch.fnom,
        });
    },
    setSpch:(state, payload) => {
        var oldStage = {...state.compos[state.indComp].stages[state.indStage]}
        state.compos[state.indComp]
            .stages.splice(state.indStage, 1, {
                ...Object.assign({}, payload),
                curve: Object.assign({},state.curentCurv),
                cnt: oldStage.cnt,
                curFreq: oldStage.curFreq,
            })
    },  
    addComp:(state) => state.compos.push({
        stages:[],
        isCalc:state.compos.length == 0,
        modes:[],
        name() { 
            return this.stages
                .map(x => x.short_name + "(" + x.cnt + ")")
                .join(" X ")
            },
        longName(){
            return this.stages
                .map(x => x.short_name + "(" + x.cnt + ")")
                .join("\n")

        } 
    }),
    setCurve:(state,{indComp, indStage, data}) => {
        state.compos[indComp]
            .stages[indStage].curve = data
    },
    setCalcComp:(state, payload) => state.compos.forEach((el,ind) => el.isCalc = (payload.indComp == ind )),
    setIndComp:(state, payload) => state.indComp = payload.indComp,
    setindStage:(state, payload) => state.indStage = payload.indStage,
    setCurMode:(state, payload) => state.curentMode = payload,
    delComp:(state, payload) => state.compos.splice(payload.indComp,1),
    
};

const actions = {
    
    async selectSPCH({state,commit, dispatch, getters}, payload){
        console.log('eldar loh');
        const curve = await dispatch('getCurves', payload)
        switch (state.curentMode) {
            case enums.ADD_SPCH:
                commit('addSpch', {curve, spch:payload});
                break;
            case enums.ADD_COMP:
                commit('addComp');
                commit('setIndComp', {
                    indComp: getters.lengthCompos - 1
                });
                commit('addSpch', {curve, spch:payload});
                commit('setCurMode',enums.ADD_SPCH);
                break;
            case enums.SET_SPCH:
                commit('setSpch',payload);
                break;
            default:
                break;
        }
    },
    setSpchAct({dispatch, commit} ,payload){
        commit('setCurMode', enums.SET_SPCH);
        commit('setIndComp', {indComp:payload.indComp});
        commit('setindStage', {indStage:payload.indStage});
        dispatch('base/showModal', null, {root: true});
    },
    addSpchAct({dispatch,commit},payload){
        commit('setCurMode', enums.ADD_SPCH);
        commit('setIndComp', payload);
        dispatch('base/showModal', null, {root: true});
    },
    addCompAct({dispatch,commit}){
        commit('setCurMode', enums.ADD_COMP);
        dispatch('base/showModal', null, {root: true});                
    },
    getCurves(context,payload){
        const path ='http://10.7.109.141:5000/gdh_' + payload.name;
        return axios.get(path)        
            .then((res) => {
                return res.data;
            })  
            .catch((error) => {
                console.error(error);
            });       
    },
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
};