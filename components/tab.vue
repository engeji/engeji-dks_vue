<template>
    <div class="wrapper-comp"
        v-if="isActive">
        <slot>
        </slot>
    </div>
</template>

<script scoped >
import {mapGetters,} from 'vuex';
export default {
    props:{
        name:{},
        selected:{default:false},
        index:{}        
    },
    data(){
      return {
            isActive:false,
      }
    },
    computed:{
        ...mapGetters(
            'mainTable', [
                'headers'
            ])
    },
    created(){
        this.isActive = this.index==0;        
    },
    mounted(){
    }
}
</script>

<style>

.wrapper-comp {
    /* width: min-content; */
    height: 100%;
    width: 100%;

}
.comp-btn {
    padding-left: 5px;
    padding-right: 5px;
    padding-top:.2em;
    padding-bottom:.2em;
    width: max-content;
    height: 5em;
}

</style>