<template>
  <div class="battleScreenOverlay" v-if="ready">
    <div class="battleScreen nes-container is-rounded">
      <div v-if="!victoryScreen">
        <h3>{{ monster.name }} lvl. {{ monster.level }}</h3>
        <div class="monsterContainer">
          <div class="healthAndMessagesContainer">
            <HealthBar
              :health="remainingMonsterHealth"
              :maxHealth="monster.health"
            />
            <textarea
              class="nes-textarea"
              name="textarea"
              rows="10"
              disabled
              v-model="battleInfo"
            />
          </div>
          <img
            class="monsterImg"
            src="https://picsum.photos/id/237/200/200"
            :alt="monster.name"
          />
        </div>

        <h3>
          {{ characterStore.character.name }} lvl.
          {{ characterStore.character.level }}
        </h3>
        <div class="playerAndMessageContainer">
          <HealthBar
            :health="characterStore.character.health"
            :maxHealth="characterStore.character.max_health"
          />
          <div class="buttonsContainer">
            <button
              class="playerActionButton nes-btn nowrap"
              :disabled="!playerTurn"
              @click="attack()"
            >
              Attack
            </button>
            <button
              class="nes-btn nowrap"
              @click="drinkPotion('s_potion')"
              :disabled="
                remainingHealthPotions('s_potion') === 0 || !playerTurn
              "
            >
              Drink small potion
            </button>
            <button
              class="nes-btn nowrap"
              @click="drinkPotion('m_potion')"
              :disabled="
                remainingHealthPotions('m_potion') === 0 || !playerTurn
              "
            >
              Drink medium potion
            </button>
            <button
              class="playerActionButton nes-btn nowrap"
              @click="tryToFlee()"
              :disabled="!playerTurn"
            >
              Run
            </button>
          </div>
        </div>
      </div>
      <div class="victoryScreen nes-container is-rounded" v-else>
        <h1>Victory!</h1>
        <h3>You gained {{ monster.exp }} xp</h3>
        <h3>You gained {{ monster.gold }} gold</h3>
        <button class="nes-btn" @click="finishBattle()">Continue</button>
      </div>
    </div>
  </div>
</template>
<script>
import HealthBar from "./HealthBar.vue";
import items from "../assets/items.json";

import { useCharacterStore } from "@/stores/character";
import { mapState, mapActions } from "pinia";
export default {
  components: {
    HealthBar,
  },
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  props: {
    monster: Object,
  },
  data() {
    return {
      ready: false,
      remainingMonsterHealth: this.monster.health,
      victoryScreen: false,
      playerTurn: false,
      monsterTurn: false,
      battleInfo: "",
    };
  },
  watch: {
    remainingMonsterHealth() {
      if (this.remainingMonsterHealth <= 0) {
        this.victoryScreen = true;
        this.setTurnsToFalse();
      }
    },
    characterStore: {
      deep: true,
      handler: function () {
        if (this.characterStore.character.health <= 0) {
          this.gameOver();
        }
      },
    },
    monsterTurn() {
      if (this.monsterTurn) {
        setTimeout(() => {
          this.monsterAttack();
        }, 1000);
      }
    },
  },
  mounted() {
    this.battleInfo += `A wild ${this.monster.name} appears!\n`;
    this.ready = true;
    this.decideInitialTurn();
  },
  methods: {
    remainingHealthPotions(potion) {
      let potions = 0;
      this.characterStore.character.inventory.forEach((item) => {
        if (item === potion) {
          potions += 1;
        }
      });
      return potions;
    },
    drinkPotion(potion) {
      this.healAmount(items.items[potion].health);
      this.removeItemFromInventory(potion);
      this.battleInfo += "You drank a potion and healed 10 health points!\n";
      //TODO: corregir el texto de puntos de vida curados
      this.swapTurns();
    },
    tryToFlee() {
      if (this.probabilityOfCharacterFleeing()) {
        this.battleInfo += "You escaped!\n";
        this.setTurnsToFalse();
        setTimeout(() => {
          this.$emit("fleedBattle");
        }, 1000);
      } else {
        this.battleInfo += "You couldn't escape!\n";
        this.swapTurns();
      }
    },
    probabilityOfCharacterFleeing() {
      let fleeChance = this.setFleeChance(
        this.characterStore.character.speed,
        this.monster.speed
      );
      let randomNumber = Math.floor(Math.random() * 100);
      return randomNumber < fleeChance;
    },
    setFleeChance(playerSpeed, monsterSpeed) {
      console.log(playerSpeed, monsterSpeed);
      if (playerSpeed === monsterSpeed) {
        return 50;
      } else if (playerSpeed > monsterSpeed) {
        return 75 + (playerSpeed - monsterSpeed) / (2 * playerSpeed);
      } else {
        return 25 - (monsterSpeed - playerSpeed) / (2 * monsterSpeed);
      }
    },
    ...mapActions(useCharacterStore, [
      "gainXp",
      "calculatePlayerAttack",
      "healAmount",
      "removeItemFromInventory",
    ]),
    gameOver() {
      this.battleInfo += "You are dead!";
      this.setTurnsToFalse();
      setTimeout(() => {
        this.$emit("gameOver");
      }, 1500);
    },
    setTurnsToFalse() {
      this.playerTurn = false;
      this.monsterTurn = false;
      console.log("setee los turnos to false");
    },
    swapTurns() {
      this.playerTurn = !this.playerTurn;
      this.monsterTurn = !this.monsterTurn;
    },
    monsterAttack() {
      const final_damage =
        this.monster.attack + Math.round((Math.random() - 0.5) * 2);
      if (this.characterStore.character.health - final_damage <= 0) {
        this.characterStore.character.health = 0;
      } else {
        this.characterStore.character.health -= final_damage;
      }
      this.battleInfo += `${this.monster.name} attacks!. It does ${final_damage} damage\n`;
      this.swapTurns();
    },
    decideInitialTurn() {
      if (this.characterStore.character.speed >= this.monster.speed) {
        this.playerTurn = true;
      } else {
        this.monsterTurn = true;
      }
    },
    attack() {
      if (this.playerTurn) {
        let damage = this.calculatePlayerAttack();
        this.remainingMonsterHealth -= damage;
        this.battleInfo += `You attack!. You do ${damage} damage\n`;
        this.swapTurns();
      }
    },
    finishBattle() {
      this.$emit("finishBattle");
    },
  },
};
</script>

<style scoped>

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.battleScreenOverlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  cursor: pointer;
}
.battleScreen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding: 20px;
  background-color: white;
  z-index: 4000;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
}

.victoryScreen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  padding: 20px;
  background-color: white;
  z-index: 6000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.monsterContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.playerActionButton {
  margin-left: 5px;
}
.buttonsContainer {
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
.messageScreen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  width: 250px;
}
progress[value] {
  /* Reset the default appearance */
  position: relative;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  margin: 20px 15px 15px 15px;
}
progress[value]::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
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
  padding: 20px 0px 20px 20px;
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
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  /* height: 100px; */
  width: 100%;
}
.healthAndMessagesContainer {
  width: 98%;
}
.healthAndMessagesContainer textarea {
  width: 100%;
  height: 137px;
  resize: none;
}
</style>
