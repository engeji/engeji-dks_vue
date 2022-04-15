import axios from 'axios';

const state = () => ({
    showManage:false,
    lockManage:false,
            
    borders:[],
})

const getters = {
    showManage:(state) =>{            
        if (state.lockManage) {
            return state.lockManage                
        }
        console.log('lock is ' + state.lockManage);
        return state.showManage;
    }
}
const mutations = {   

    hideManage(state){
        state.showManage = !state.showManage;
    },
    lockManage(state){
        state.lockManage = !state.lockManage;
    },     
    
    setBorderOnCoocie(state){ 
        console.log('border creating');                       
        state.borders.forEach((b) => {                
            if (localStorage.getItem(b.key) == null) {
                localStorage.setItem(b.key, b.value);
                console.log('now coocie has ' + b.key);                    
            }
            else {
                b.value = localStorage.getItem(b.key);
            }            
        });
    },  

    setCurProp(state, item){            
        localStorage.setItem(item.key, item.value);
        console.log(localStorage.getItem(item.key));        
    },
    
    updateLimits(state, payload){
        state.borders = [
            ...state.borders,
            ...payload,
        ]
    },

}

const actions = {
    setDefaultLimits({commit}){
        const path = 'http://10.7.109.141:5000/default_limits';
        axios.get(path)
        .then((res) => {                                
            commit('updateLimits',res.data.default_limits);                    
        })
        .catch((error) => {
            console.error(error);
        });
    },
    setCurPropAsync(context, payload){
        context.commit('setCurProp', payload);
    }               
}


export default {
    namespaced:true,
    state,    
    mutations,
    getters,
    actions
    
}
