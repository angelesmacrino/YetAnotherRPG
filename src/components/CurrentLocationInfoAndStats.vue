<template>
  <div id="locationDiv">
    <h2>You are in {{ locationName }}</h2>
    <div class="nes-container is-rounded">
      <h3>
        {{ locationDescription }}
      </h3>
    </div>
    <CityActions v-if="characterStore.currentTerrain === 'C'" />
  </div>
</template>

<script>
import CityActions from "./CityActions.vue";
import locations from "../assets/locations.json";
import { useCharacterStore } from "@/stores/character";
import { mapState } from "pinia";

export default {
  components: {
    CityActions,
  },
  data() {
    return {
      locationName: "",
      locationDescription: "",
    };
  },
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  watch: {
    characterStore: {
      deep: true,
      handler: function () {
        this.setLocation();
      },
    },
  },
  mounted() {
    this.setLocation();
  },
  methods: {
    setLocation() {
      console.log(locations.locations[this.characterStore.currentTerrain]);
      this.locationName =
        locations.locations[this.characterStore.currentTerrain].name;
      this.locationDescription =
        locations.locations[this.characterStore.currentTerrain].description;
    },
  },
};
</script>

<style scoped>

#locationDiv {
  text-align: center;
  margin: 15px;
}
#locationDiv h2 {
  margin-bottom: 15px;
}
</style>
