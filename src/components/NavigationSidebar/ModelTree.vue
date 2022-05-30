<template>
  <div v-if="processLayerStore.processLayers.length > 0">
    <ul class="list-inside text-left mt-2">
      <ModelTreePart
        :processLayers="processLayerStore.processLayers"
        :parentId="firstLayerId"
        @change-level="$emit('change-level', $event)"
      ></ModelTreePart>
    </ul>
  </div>
  <div v-else>No business processes in the repository.</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import processStore from "../../store/processLayerStore";
import { BASE_LAYER_ID } from "../../interfaces/ProcessLayer";
import ModelTreePart from "./ModelTreePart.vue";
export default defineComponent({
  name: "model-tree",
  emits: ["change-level"],
  data() {
    return {
      processLayerStore: processStore.state,
    };
  },
  components: { ModelTreePart },
  computed: {
    firstLayerId(): string {
      return BASE_LAYER_ID;
    },
  },
});
</script>

<style scoped>
ul > li {
  margin-left: 10px;
}
</style>
