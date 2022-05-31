<template>
  <div v-if="processLayerStore.processLayers.length > 0">
    <ul class="list-inside text-left mt-2">
      <ProcessLayerTreePart
        :processLayers="layersOfBusinessProcess"
        :parentLayer="businessProcess"
        @change-layer="$emit('change-layer', $event)"
      ></ProcessLayerTreePart>
    </ul>
  </div>
  <div v-else>No layers in this business process.</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProcessLayer } from "../../interfaces/ProcessLayer";
import processStore from "../../store/processLayerStore";
import ProcessLayerTreePart from "./ProcessLayerTreePart.vue";
export default defineComponent({
  name: "process-layer-tree",
  emits: ["change-layer"],
  props: {
    businessProcess: {
      type: Object as PropType<ProcessLayer>,
      required: true,
    },
  },
  data() {
    return {
      processLayerStore: processStore.state,
    };
  },
  components: { ProcessLayerTreePart },
  computed: {
    layersOfBusinessProcess(): ProcessLayer[] {
      return processStore.getLayersOfBusinessProcess(this.businessProcess.id);
    },
  },
});
</script>

<style scoped>
ul > li {
  margin-left: 10px;
}
</style>
