<template>
  <div v-if="rpaFlowStore.rpaFlows.length > 0">
    <ul class="list-inside text-left mt-2 cursor-pointer">
      <li
        v-for="rpaFlow in rpaFlowStore.rpaFlows"
        @click="$emit('change-flow', rpaFlow.id)"
        class="cursor-pointer"
      >
        {{ rpaFlow.name }}
      </li>
    </ul>
  </div>
  <div v-else>No RPA flows in the repository.</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rpaFlowStore from "../../store/rpaFlowStore";
export default defineComponent({
  name: "rpa-flow-list",
  emits: ["change-flow"],
  data() {
    return {
      rpaFlowStore: rpaFlowStore.state,
    };
  },
});
</script>
