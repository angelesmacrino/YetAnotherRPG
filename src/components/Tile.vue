<template>
  <div class="tile" :class="setTileTypeClass()">
    <slot></slot>
  </div>
</template>

<script>
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
        return 'tileCity'
      } else if (this.tile === 'P') {
        return 'tilePlains'
      } else if (this.tile === 'M') {
        return 'tileMountains'
      } else if (this.tile === 'F') {
        return 'tileForest'
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
  background-color: #56ff6f;
}
.tileMountains {
  background-color: #7a4e0a;
}
.tileForest {
  background-color: #0a7a4e;
}
</style>
