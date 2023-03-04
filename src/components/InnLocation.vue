<template>
  <p>{{ message }}</p>
  <button class="nes-btn" @click="tryToRest(1)">
    Rest for the night ({{ COST_PER_NIGHT }} gp)
  </button>
  <button
    class="nes-btn"
    :disabled="fullRestCalculator.daysToRest < 1"
    @click="tryToRest(fullRestCalculator.daysToRest)"
  >
    Rest until healed ({{ fullRestCalculator.totalCost }} gp)
  </button>
  <button class="nes-btn" @click="leaveInn()">Leave</button>
</template>

<script>
import TheCity from "../assets/TheCity.json";
import { useCharacterStore } from "@/stores/character";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      message: "",
      COST_PER_NIGHT: 10,
    };
  },
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
    fullRestCalculator() {
      let daysToRest = 0;
      let totalCost = 0;
      let currentHealth = this.characterStore.character.health;
      let maxHealth = this.characterStore.character.max_health;
      while (currentHealth < maxHealth) {
        daysToRest++;
        totalCost += this.COST_PER_NIGHT;
        currentHealth += 10;
      }
      let discount = 1 * (daysToRest - 1);
      totalCost = daysToRest !== 0 ? totalCost - discount : this.COST_PER_NIGHT;
      return { daysToRest, totalCost };
    },
  },
  methods: {
    ...mapActions(useCharacterStore, [
      "spendGold",
      "restoreAllHealth",
      "healAmount",
    ]),
    tryToRest(amount) {
      let daysToRest = amount;
      let discount = 1 * (daysToRest - 1);
      if (
        this.characterStore.character.gold >=
        (this.COST_PER_NIGHT - discount) * daysToRest
      ) {
        this.spendGold((this.COST_PER_NIGHT - discount) * daysToRest);
        this.healAmount(10 * daysToRest);
        this.message = TheCity.inn.messages.rested;
      } else {
        this.message = TheCity.inn.messages.notEnoughGold;
      }
    },
    leaveInn() {
      this.$emit("leaveInn");
    },
  },
};
</script>

<style></style>
