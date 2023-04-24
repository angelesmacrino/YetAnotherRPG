<template>
  <p class="smallerParagraph">{{ message }}</p>
  <button class="nes-btn" @click="askAboutDiploma">Ask about diploma</button>
  <button class="nes-btn" @click="requestDiploma">
    Request Certified Adventurer™ Diploma
  </button>
  <button class="nes-btn" @click="leaveOffice">Leave Office</button>
</template>

<script>
import { useCharacterStore } from "@/stores/character";
import { mapState } from "pinia";
export default {
  data() {
    return {
      GOBLIN_TOOTHS: 40,
      ORC_EARS: 20,
      TROLL_HIDES: 5,
      message: "",
    };
  },
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  methods: {
    askAboutDiploma() {
      this.message = `With the Certified Adventurer™ Diploma you are officially allowed to carry 
      a metal sword and a shield, take quests from other people and even leave the province to try to banquish The Great Evil™. \n 
      Procedure fees: ${this.GOBLIN_TOOTHS} goblin teeth, ${this.ORC_EARS} orc ears and ${this.TROLL_HIDES} troll hides.`;
    },
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
      if (
        goblinTooths === this.GOBLIN_TOOTHS &&
        orcEars === this.ORC_EARS &&
        trollHides === this.TROLL_HIDES
      ) {
        console.log("you won!");
      } else {
        this.message = "You don't have the required items to get a diploma.";
      }
    },
  },
};
</script>

<style></style>
