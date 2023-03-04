<template>
  <div class="buttonsGroup" v-if="currentLocation === null">
    <button class="nes-btn" @click="changeLocation('inn')">Inn</button>
    <button class="nes-btn" @click="changeLocation('merchant')">
      Merchant
    </button>
    <button class="nes-btn" @click="changeLocation('office')">
      Adventurer's Office
    </button>
  </div>
  <div v-else>
    <div
      class="nes-container with-title is-centered statsContainer cityActionsContainer"
    >
      <p class="title">
        <b> {{ currentLocationTitle }} </b>
      </p>
      <InnLocation
        v-if="currentLocation === 'inn'"
        @leaveInn="
          () => {
            currentLocation = null;
          }
        "
      />
      <MerchantLocation
        v-if="currentLocation === 'merchant'"
        @leaveMerchant="
          () => {
            currentLocation = null;
          }
        "
      />
      <GuildLocation
        v-if="currentLocation === 'office'"
        @leaveOffice="
          () => {
            currentLocation = null;
          }
        "
      />
    </div>
  </div>
</template>

<script>
import InnLocation from "./InnLocation.vue";
import MerchantLocation from "./MerchantLocation.vue";
import GuildLocation from "./GuildLocation.vue";
import { useCharacterStore } from "@/stores/character";
import { mapState } from "pinia";
export default {
  components: {
    InnLocation,
    MerchantLocation,
    GuildLocation,
  },
  data() {
    return {
      currentLocation: null,
    };
  },
  computed: {
    currentLocationTitle() {
      if (this.currentLocation === "inn") {
        return "Inn";
      }
      if (this.currentLocation === "merchant") {
        return "Merchant";
      }
      if (this.currentLocation === "office") {
        return "Adventurer's Office";
      } else return "";
    },
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  methods: {
    changeLocation(location) {
      this.currentLocation = location;
    },
  },
};
</script>

<style></style>
