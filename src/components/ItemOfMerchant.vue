<template>
  <li
    
    v-for="item in TheCity.merchant.items"
    :key="items.items[item].id"
    @click="getItemInfo(item)"
  >
    {{ items.items[item].name[0] }}
  </li>
</template>

<script>
import TheCity from "../assets/TheCity.json";
import items from "../assets/items.json";

export default {
  data() {
    return {
      TheCity,
      items,
    };
  },
  methods: {
    getItemInfo(item) {
      this.$emit("getItemInfo", item);
    },
  }
};
</script>

<style></style>
