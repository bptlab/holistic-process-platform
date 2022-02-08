<template>
  <ul class="px-3 list-none model-breadcrumb text-center">
    <li
      class="inline"
      v-for="level in levels"
      style="margin: 5px"
      @click="$emit('change-level', level)"
    >
      <span class="cursor-pointer text-blue-600 hover:text-blue-800">{{
        level
      }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "model-breadcrumb",
  props: {
    levels: {
      type: Array,
      requrired: true,
    },
  },
  emits: ["change-level"],
});
</script>

<style>
ul.model-breadcrumb li + li:before {
  content: "/\00a0";
  @apply p-2;
}
</style>
