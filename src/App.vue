<template>
  <div class="gameContainer">
    <Tileboard
      v-if="!gameIsOver"
      @monsterBattle="monsterBattle"
      :inBattle="inBattle"
    />
    <div
      v-if="!gameIsOver"
      style="padding: 15px; min-width: 460px; max-width: 460px"
    >
      <button
        id="charButton"
        class="nes-btn is-warning"
        @click="toggleCharacterStats()"
      >
        {{ lookingAtCharacter ? "C" : "M" }}
      </button>

      <CurrentLocationInfoAndStats v-if="!lookingAtCharacter" />

      <Character v-show="lookingAtCharacter" @levelUp="levelUpModal()" />
    </div>
    <BattleScreen
      v-if="inBattle"
      :monster="battledMonster"
      @finishBattle="finishBattle()"
      @gameOver="gameOver()"
      @fleedBattle="fleedBattle()"
    />
    <AfterBattleModal
      v-if="afterBattleModal"
      :event="after_battle_event"
      @closeModal="closeAfterBattleModal"
    />
    <GameOver v-if="gameIsOver" />
  </div>
</template>

<script>
import Tileboard from "./components/Tileboard.vue";
import BattleScreen from "./components/BattleScreen.vue";
import Character from "./components/Character.vue";
import AfterBattleModal from "./components/AfterBattleModal.vue";
import GameOver from "./components/GameOver.vue";
import CurrentLocationInfoAndStats from "./components/CurrentLocationInfoAndStats.vue";
import { useCharacterStore } from "@/stores/character";
import { mapState, mapActions } from "pinia";


export default {
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  components: {
    Tileboard,
    BattleScreen,
    Character,
    AfterBattleModal,
    GameOver,
    CurrentLocationInfoAndStats
  },
  data() {
    return {
      inBattle: false,
      battledMonster: null,
      afterBattleModal: false,
      gameIsOver: false,
      lookingAtCharacter: false,
      after_battle_event: ""
    };
  },
  methods: {
    ...mapActions(useCharacterStore, ["gainXp", "gainGold"]),
    toggleCharacterStats() {
      this.lookingAtCharacter = !this.lookingAtCharacter;
    },
    fleedBattle() {
      this.inBattle = false;
      this.battledMonster = null;
    },
    monsterBattle(battledMonster) {
      this.setAttributesOfMonster(battledMonster);
      this.monsterWillDropLoot(battledMonster);
      this.inBattle = true;
      this.battledMonster = battledMonster;
    },
    setAttributesOfMonster(battledMonster) {
      this.setMonsterLevel(battledMonster);
      this.setMonsterAttributes(battledMonster);
    },
    setMonsterLevel(battledMonster) {
      const randomNumber = Math.floor(Math.random() * 2);
      switch (this.characterStore.currentTerrain) {
        case "P": {
          if (battledMonster.name === "Orc") {
            battledMonster.level = 1;
          } else {
            battledMonster.level = randomNumber + 1;
          }
          break;
        }
        case "F": {
          if (battledMonster.name === "Troll") {
            battledMonster.level = 1;
          }
          battledMonster.level = randomNumber + 2;
          break;
        }
        case "M": {
          battledMonster.level = randomNumber + 4;
          break;
        }
      }
    },
    setMonsterAttributes(battledMonster) {
      const ATTRS = ["health", "attack", "defense", "speed", "gold", "exp"];
      for (let i = 0; i < ATTRS.length; i++) {
        const attr = ATTRS[i];
        battledMonster[attr] =
          battledMonster[`base_${attr}`] +
          battledMonster[`${attr}_per_level`] * (battledMonster.level - 1);
      }
    },
    monsterWillDropLoot(battledMonster) {
      const chance = Math.floor(Math.random() * 2);
      if (battledMonster.drop_rate * 10 > chance) {
        battledMonster.has_loot = true;
      }
    },
    finishBattle() {
      this.inBattle = false;
      this.gainXp(this.battledMonster.exp);
      this.gainGold(this.battledMonster.gold);
      if (this.monsterDroppedLoot()) {
        this.addDropToCharacterAndOpenModal();
      }
      this.battledMonster = null;
    },
    addDropToCharacterAndOpenModal() {
      this.characterStore.character.loot.push(this.battledMonster.drop);
      this.after_battle_event = this.battledMonster.drop;
      this.afterBattleModal = true;
    },
    monsterDroppedLoot() {
      return this.battledMonster.has_loot;
    },
    levelUpModal() {
      this.after_battle_event = "level_up";
      this.afterBattleModal = true;
    },
    closeAfterBattleModal() {
      this.afterBattleModal = false;
    },
    gameOver() {
      this.inBattle = false;
      this.battledMonster = null;
      this.gameIsOver = true;
    },
  },
};
</script>
<style>
.nowrap {
  white-space: nowrap;
}
#app {
  width: 77%;
}
#charButton {
  position: absolute;
  z-index: 1000;
}
.p-0 {
  padding: 0 !important;
}
.m-0 {
  margin: 0 !important;
}
.smallerParagraph {
  font-size: 0.8rem;
  display: inline;
}
.nes-btn:disabled {
  background-color: #e7e7e7;
  cursor: not-allowed;
}
.nes-btn:disabled::after {
  box-shadow: none !important;
}
.nes-btn:active:not(.is-disabled)::after {
  box-shadow: none;
}

.statsContainer {
  margin-top: 15px;
}
.buttonsGroup {
  margin: 30px 15px 15px 15px;
  display: flex;
  justify-content: space-between;
}
.inventoryList {
  padding: 0;
  text-align: start;
  max-width: fit-content;
}
.inventoryList li {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 3px;
  border: 3px solid black;
}
.stat {
  text-align: initial;
}
.inventoryList li small {
  position: absolute;
  bottom: 10px;
  right: 5px;
  width: 5px;
  height: 5px;
  color: orangered;
}

.cityActionsContainer {
  display: flex;
  flex-direction: column;
}

@media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .nes-container.is-rounded,
  .nes-btn,
  .nes-progress,
  .nes-textarea {
    border-image-repeat: stretch !important;
  }
}
</style>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
