<template>
  <div class="nes-container with-title is-centered statsContainer">
    <p class="title">
      <b> Inventory </b>
    </p>
    <ul class="inventoryList">
      <li v-for="item in Object.keys(itemApiling)" :key="item">
        {{ item[0] }}
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
};
</script>

<style></style>
