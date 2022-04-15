  <template>
  <div :class="{
    'wrapper-tabs__rotated': isRotated,
    'wrapper-tabs__no-rotated': !isRotated,
    }">
    <div :class="{
      'tab-panel__rotated':isRotated,
      'tab-panel__no-rotated':!isRotated,
      }">
      <div :class="{
            'active-tab__no-rotated' : !isRotated,
            'active-tab__rotated' : isRotated,
            'tab-btn__rotated': isRotated,
            'tab-btn__no-rotated': !isRotated,
          }"
          v-if="hasMenu">
        <slot name="menu"/>
      </div>
      <div
          v-for="(item, ind) in itemsNoDefault"
          :key="ind"
          :class="{
            'active-tab__no-rotated' :item.isActive && !isRotated,
            'active-tab__rotated' :item.isActive && isRotated,
            'tab-btn__rotated': isRotated,
            'tab-btn__no-rotated': !isRotated,
          }">
          <button :class="{
            'label__rotated': isRotated,
            'label__no-rotated': !isRotated,
            }"
            :style="item.isActive ? noActiveClassColor : ''"
            @click="selectTab(item)">
            {{item.name}}
          </button>
          <div class="tab-label no-select close"
          @click="$emit('delete_fn',ind)"
          v-if="hasClose"/>
      </div>
      <div :class="{
        'tab-btn__rotated':isRotated,
        'tab-btn__no-rotated':!isRotated,
        }"
        v-if="hasButton">        
        <slot name="button" class="tab-btn"/>
      </div>
    </div>
    <div :class="{
      'content__rotated' : isRotated,
      'content__no-rotated' : !isRotated,
    }"
      :style="contentClassColor">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentColor: { default: "whitesmoke" },
    noActiveColor: { default: "white" },
    isRotated: { default: false },
    default: { default: "default" },
    hasClose: { default: true },
  },
  computed:{
    hasButton(){return Object.keys(this.$slots).some(x => x == 'button')},
    hasMenu()  {return Object.keys(this.$slots).some(x => x == 'menu')},
    itemsNoDefault(){return this.items.filter(x => x.name != this.default)},
  },
  data(){
    return{
      items:[],
      contentClassColor:{'background-color': this.contentColor},
      noActiveClassColor:{'background-color': this.noActiveColor},
    }
  },
  created() {
    this.items = this.$children;
  },
  methods: {
    selectTab(item) {
      this.$emit("select_tab", item.index);
      this.items.forEach((x) => (x.isActive = x.index == item.index));
    },
  },
};
</script>
<style>
.close {
  width: 18px !important;
  height: 18px !important;  
}
.wrapper-tabs__rotated {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  height: 100%;
}

.wrapper-tabs__no-rotated {
  display: grid;
  grid-template-rows: max-content;
}

.tab-panel__rotated {
  display:grid;
  grid-gap: 20px;
  align-items:flex-start;
  align-content: flex-start;
}

.tab-panel__no-rotated {
  display:grid;
  justify-content:left;  
  grid-auto-flow: column;
  align-items:flex-end;
  grid-gap: 20px;
}

.active-tab__no-rotated {top: 2px;}
.active-tab__rotated {left: 2px;}
.content__no-rotated {border-top: 1px solid black;}
.content__rotated {border-left: 1px solid black;}

.tab-btn__no-rotated {
  position: relative;
  z-index: 10;
  display: grid;
  grid-auto-flow: column;
  border: 2px solid black;
  border-bottom: unset;
  border-radius: 3px;
  border-bottom-right-radius: unset;
  border-bottom-left-radius: unset;
}

.tab-btn__rotated {
  position: relative;
  z-index: 10;
  display: grid;
  grid-auto-flow: row;
  border: 2px solid black;
  border-right: unset;
  border-radius: 3px;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
}

.label__no-rotated {
  border: unset;
}

.label__rotated {
  border: unset;
  writing-mode: sideways-lr;
}

</style>
