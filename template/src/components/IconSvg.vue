<template>
  <svg class="svg-icon" :viewBox="iconViewBox">
    <use :xlink:href="iconId" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "icon-svg",
  props: {
    symbol: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconId(): string {
      return `#${this.symbol.id}`;
    },
    iconViewBox(): string {
      return this.symbol.viewBox;
    },
  },
});
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
