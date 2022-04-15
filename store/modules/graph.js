const state  = () => ({
});

const getters = {
    dataColl(state, getterts, {compos}){
        state;
        getterts;
        return {
            datasets: compos.compos
                .filter(x => x.isCalc)[0]
                .stages.map(x => x.curve)
        };
    }
};
export default {
    namespaced:true,
    state,
    getters,
};
