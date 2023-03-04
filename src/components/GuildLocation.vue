<template>
  <button class="nes-btn" @click="requestDiploma">Request Diploma</button>
  <button class="nes-btn" @click="leaveOffice">Leave Office</button>
</template>

<script>
import { useCharacterStore } from "@/stores/character";
import { mapState } from "pinia";
export default {
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  methods: {
    leaveOffice() {
      this.$emit("leaveOffice");
    },
    requestDiploma() {
      let goblinTooths = 0;
      let orcEars = 0;
      let trollHides = 0;
      this.characterStore.character.loot.forEach((loot) => {
        if (loot === "g_tooth") {
          goblinTooths += 1;
        }
        if (loot === "orc_ear") {
          orcEars += 1;
        }
        if (loot === "troll_hide") {
          trollHides += 1;
        }
      });
      console.log(goblinTooths, orcEars, trollHides);
      if (goblinTooths === 50 && orcEars === 25 && trollHides === 5) {
        console.log("you won!");
      }
    },
  },
};
</script>

<style></style>
