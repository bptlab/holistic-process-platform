<template>
  <div class="text-lg text-center">Process Layers</div>
  <hr />
  <ul class="list-disc list-inside text-left mt-2">
    <ModelTreePart
      :processLayers="processLayerStore.processLayers"
      :parentId="firstLayerId"
      @change-level="$emit('change-level', $event)"
    ></ModelTreePart>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import processStore from "../store/processLayerStore";
import { BASE_LAYER_ID } from "../interfaces/ProcessLayer";
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

<style>
ul > li {
  margin-left: 10px;
}
</style>
