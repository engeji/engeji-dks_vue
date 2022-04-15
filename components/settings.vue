<template>
    <div class="wrapper-settings">
        Настройки
        <div v-for="item in borders" :key="item.key" class="setting-items">
            <label class="settings-title" for="settings-title">{{item.title}}</label>
            <input v-model.number="item.value"
                    @keyup="setCurPropAsync(item)" type="text" class="settings-value">
        </div>
    </div>  
  
</template>

<script>
import {mapMutations,mapActions, mapState} from 'vuex';

export default {
    computed:{
        ...mapState('limits', ['borders'])
    },
    methods:{
        ...mapMutations('limits', ['setBorderOnCoocie']),
        ...mapActions('limits', ['setCurPropAsync']),
        ...mapActions('limits', ['setDefaultLimits']),
    },
    created(){   
          
        this.setBorderOnCoocie();
    } 
}
</script>

<style>

    .setting-items {
        font-size: 13px;
        display: grid;
        grid-auto-flow: column;
    }

    .settings-value {
        width: 100px;
        text-align: center;
        justify-self: end;
    }
    
    .settings-title{
        max-width: 240px;
    }

</style>