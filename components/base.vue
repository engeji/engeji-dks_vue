<template>
  <transition name="modal">
    <div
      class="base"
      v-if="showModal"
      @click.self="hideModal"
      @keyup.esc="hideModal"
    >
      <ul class="listSPCH">
        <span class="header no-select"> Двойной клик чтобы выбрать СПЧ </span>
        <li v-for="(press, index) in baseSPCH" :key="index">
          <div class="no-select">
            <div @click="press.show = !press.show">
              {{ "\u25B6" + "ГПА16-" + press.pressure }}
            </div>
            <ul v-if="press.show" class="no-select">
              <li
                class="spch-spoted no-select"
                @dblclick="selectSPCH(spch)"
                v-for="(spch, index) in press.list"
                :key="index"
              >
                {{ spch.short_name }}
                <div class="spch-name" @click="press.show = false">
                  {{ spch.name }}
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations,mapActions } from "vuex";
export default {
  computed: {
    ...mapState("base", ["baseSPCH", "showModal"]),
  },
  methods: {
    ...mapMutations("base", ["getMessage"]),
    ...mapActions("compos", ["selectSPCH"]),
    ...mapActions("base", ["hideModal"]),
  },
  created() {
    this.getMessage();
    
  },
};
</script>

<style>
.base {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.1s ease;
  display: grid;
}

.listSPCH {
  background-color: antiquewhite;
  width: 30%;
  justify-self: center;
  align-self: center;
}

.modal-enter {
  opacity: 0;
}

.spch-spoted {
  padding-left: 14px;
  text-align: left;
}

.spch-spoted:hover {
  background-color: rgb(134, 153, 153);
  cursor: pointer;
}

.spch-name {
  color: rgba(0, 0, 0, 0.35);
  float: right;
}
</style>
