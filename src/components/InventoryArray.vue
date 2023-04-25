<template>
  <div class="nes-container with-title is-centered statsContainer">
    <p class="title">
      <b> Inventory </b>
    </p>
    <ul class="inventoryList">
      <li v-for="item in Object.keys(itemApiling)" :key="item" :style="{ backgroundImage: `url(${setItemImg(item)})` }">
        <small class="itemQuantity">
          <b>
            {{ itemApiling[item] }} 
          </b>
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
import s_potion from "../assets/img/s_potion.jpg";
import m_potion from "../assets/img/m_potion.jpg";
import l_potion from "../assets/img/l_potion.jpg";

export default {
  computed: {
    itemApiling() {
      return this.items.reduce((acc, item) => {
        console.log(item);
        if (acc[item]) {
          acc[item] += 1;
        } else {
          acc[item] = 1;
        }
        return acc;
      }, {});
    },
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    setItemImg(item) {
      if (item === "s_potion") {
        return s_potion;
      } else if (item === "M") {
        return m_potion;
      } else if (item === "L") {
        return l_potion;
      }
    },
  }
};
</script>

<style></style>
