<template>
  <div class="tile" :style="{ backgroundImage: `url(${setTileTypeClass()})` }">
    <slot></slot>
  </div>
</template>

<script>
import grassTile from "../assets/img/grass3.jpg"
import forestTile from "../assets/img/forest.jpg"
import cityTile from "../assets/img/city.jpg"
import mountainTile from "../assets/img/mountain.jpg"

export default {
  props: {
    coordinates: {
      type: Array,
      required: true,
    },
    tile: {
      type: String,
      required: true
    }
  },
  methods: {
    setTileTypeClass() {
      if (this.tile === 'C') {
        return cityTile
      } else if (this.tile === 'P') {
        return grassTile
      } else if (this.tile === 'M') {
        return mountainTile
      } else if (this.tile === 'F') {
        return forestTile
      }
    }
  }
};
</script>

<style scoped>

.tile {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 50px;
  height: 50px;
}
.tileCity {
  background-color: #91bdff;
}
.tilePlains {

}
.tileMountains {
  background-color: #7a4e0a;
}
.tileForest {
  background-color: #0a7a4e;
}
</style>
