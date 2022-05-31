<template>
  <li @click="$emit('change-layer', parentLayer.id)" class="cursor-pointer">
    {{ currentLayerLevel }} - {{ currentLayerName }}
  </li>
  <ul v-if="layersToShow.length > 0" class="list-inside pl-4">
    <ProcessLayerTreePart
      v-for="layer in layersToShow"
      :processLayers="processLayers"
      :parentLayer="layer"
      style="margin: 5px"
      @change-layer="$emit('change-layer', $event)"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProcessLayer, ProcessLevel } from "../../interfaces/ProcessLayer";
export default defineComponent({
  name: "business-process-tree-part",
  emits: ["change-layer"],
  props: {
    processLayers: {
      type: Array as PropType<Array<ProcessLayer>>,
      required: true,
    },
    parentLayer: {
      type: Object as PropType<ProcessLayer>,
      required: true,
    },
  },
  computed: {
    layersToShow(): ProcessLayer[] {
      return this.processLayers.filter(
        (layer) => layer.parent === this.parentLayer.id
      );
    },
    currentLayerName(): string {
      if (this.parentLayer.name) {
        return this.parentLayer.name;
      }
      return this.parentLayer.id;
    },
    currentLayerLevel(): string {
      return this.parentLayer.level.toString();
    },
  },
});
</script>
