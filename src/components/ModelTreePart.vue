<template>
  <li @click="$emit('change-level', parentId)">
    {{ currentLayerName }}
  </li>
  <ul v-if="layersToShow.length > 0" class="list-disc list-inside pl-4">
    <ModelTreePart
      v-for="layer in layersToShow"
      :processLayers="processLayers"
      :parentId="layer.id"
      style="margin: 5px"
      @change-level="$emit('change-level', $event)"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProcessLayer } from "../interfaces/ProcessLayer";
export default defineComponent({
  name: "model-tree",
  emits: ["change-level"],
  props: {
    processLayers: {
      type: Array as PropType<Array<ProcessLayer>>,
      required: true,
    },
    parentId: String,
  },
  computed: {
    layersToShow(): ProcessLayer[] {
      return this.processLayers.filter(
        (layer) => layer.parent === this.parentId
      );
    },
    currentLayerName(): string | undefined {
      const activeLayer = this.processLayers.find(
        (layer) => layer.id === this.parentId
      );
      if (!activeLayer) {
        return "";
      }
      if (activeLayer.name) {
        return activeLayer.name;
      }
      return activeLayer.id;
    },
  },
});
</script>
