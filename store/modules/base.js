import axios from 'axios';

const state = () => ({
    baseSPCH:[],
    showModal:false,
});


const mutations = {
    getMessage:state =>{
        const path ='http://10.7.109.141:5000/base';
        axios.get(path)
            .then((res) => {                    
                state.baseSPCH = res.data.base;                    
            })
            .catch((error) => {
                console.error(error);
            });
    },    
}

const actions = {
    showModal:({state}) => state.showModal = true,
    hideModal:({state}) => state.showModal = false,
}




export default {
    namespaced:true,
    state,    
    mutations,
    actions
    
}