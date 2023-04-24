<template>
  <p style="margin: 0px">
    <b> {{ item.name }}: {{ item.price }} gp </b>
  </p>
  <p class="smallerParagraph">{{ item.description }}</p>
  <button class="nes-btn p-0" :disabled="!canBuyItem()" @click="buyItem()">Buy</button>
</template>

<script>
import { mapState } from "pinia";
import { useCharacterStore } from "@/stores/character";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useCharacterStore, {
      characterStore: (state) => state,
    }),
  },
  methods: {
    canBuyItem() {
      return this.characterStore.character.gold >= this.item.price;
    },
    buyItem() {
      this.$emit("buyItem");
    },
  },
};
</script>

<style></style>
