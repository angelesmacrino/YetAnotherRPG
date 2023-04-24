import { defineStore } from "pinia";
import items from "../assets/items.json";
export const useCharacterStore = defineStore("characterStore", {
  state: () => {
    let character = {
      name: "Player",
      max_health: 20,
      health: 20,
      attack: 2,
      attack_per_level: 2,
      max_health_per_level: 5,
      speed_per_level: 1,
      defense: 1,
      speed: 2,
      level: 1,
      exp: 0,
      gold: 10,
      INVENTORY_LIMIT: 10,
      inventory: ["w_sword", "s_potion"],
      loot: [],
      equipped: [{ name: "w_sword", type: items.items["w_sword"].type }],
    };
    let currentTerrain = "";
    return {
      character,
      currentTerrain,
    };
  },
  actions: {
    gainXp(xp) {
      this.character.exp += xp;
    },
    gainGold(gold) {
      this.character.gold += gold;
    },
    setCurrentTerrain(terrain) {
      this.currentTerrain = terrain;
    },
    spendGold(gold) {
      this.character.gold -= gold;
    },
    restoreAllHealth() {
      this.character.health = this.character.max_health;
    },
    healAmount(amount) {
      this.character.health += amount;
      if (this.character.health > this.character.max_health) {
        this.character.health = this.character.max_health;
      }
    },
    removeItemFromInventory(item) {
      const index = this.character.inventory.indexOf(item);
      if (index > -1) {
        this.character.inventory.splice(index, 1);
      }
    },
    addItemToInventory(item) {
      this.character.inventory.push(item);
    },
    findNumberBetweenMinMax(array) {
      const min = Math.min(...array);
      const max = Math.max(...array);
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    calculatePlayerAttack() {
      let attack = this.character.attack;
      this.character.equipped.forEach((item) => {
        if (item.type === "weapon") {
          attack += this.findNumberBetweenMinMax(items.items[item.name].damage);
        }
      });
      return attack;
    },
  },
});
