<template>
  <div class="wrapper-boxes">
    <div class="panel-box">
      <font-awesome-icon
        class="place-holder add-gpa"
        :icon="['fas', 'plus']"
        @click="$emit('inc')"
      />
      <input class="cnt" type="text"
        v-model.number="cnt" 
        @change="$emit('change', cnt)"/>
      <font-awesome-icon
        class="place-holder add-gpa"
        :icon="['fas', 'minus']"
        @click="$emit('dec')"/>
      <div class="close del-stage"
        @click="$emit('del')"/>
    </div>
    <div class="all-boxes">
      <div class="box" v-for="indBox in cnt" :key="indBox">
        <input type="button"
          :value="title"
          @click="$emit('set')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { default: "emptyName" },
    cnt: { default: 1 },
  },
  data(){
    return {
      curent_value:1
    }
  },

};
</script>

<style>

.del-stage {
  width: auto !important;
  font-size: 10px !important;
}

.cnt {
  max-width: 30px;
  justify-self: center;
  text-align: center;
}
.panel-box {
  display: grid;
  justify-content: space-between;
  grid-auto-flow: column;
  background-color:lightskyblue;

}

.box {
  display: grid;
  align-content: space-around;
}
.wrapper-boxes {
  background-color: aliceblue;
  display: grid;
  grid-template-rows: min-content auto;
  align-self: space-around;
  height: 100%;
}
.all-boxes {
  display: grid;
  justify-content: center;
  height: 100%;
}

.add-gpa {
  font-size: 20px;
}
</style>
