<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <icon-svg :symbol="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import menu from "@/assets/icons/menu.svg";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      menu,
    };
  },
});
</script>
