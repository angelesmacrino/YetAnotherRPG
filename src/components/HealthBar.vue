<template>
  <small class="monsterHealthNumber">
    {{ health }} /
    {{ maxHealth }}
  </small>
  <progress class="nes-progress is-danger" :value="health" :max="maxHealth" />
</template>

<script>
export default {
  props: {
    health: Number,
    maxHealth: Number,
  },
};
</script>

<style scoped>
.nes-progress {
  margin-top: 26px !important;
  height: 20px !important;
  width: 98%;
}
.is-danger {
  background-color: #ff0000;
  color: #ff0000;
}

progress[value]::-webkit-progress-value {
  background-color: red;
  border-radius: 2px;
}
.battleScreen h3 {
  text-align: center;
  font-weight: 600;
}

.monsterImg {
  align-self: center;
  width: 200px;
  padding: 10px;
}
.monsterHealthNumber {
  position: absolute;
  left: 15px;
  top: 3px;
  font-weight: 800;
  color: black;
}
.statsContainer {
  display: inline-block;
}
.playerAndMessageContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  height: 100px;

  width: 100%;
}
</style>
