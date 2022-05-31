<template>
  <div v-if="businessProcesses.length > 0">
    <ul class="list-inside text-left mt-2">
      <ProcessLayerTree
        v-for="businessProcess in businessProcesses"
        :businessProcess="businessProcess"
        @change-layer="$emit('change-layer', $event)"
      ></ProcessLayerTree>
    </ul>
  </div>
  <div v-else>No business processes in the repository.</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ProcessLayer } from "../../interfaces/ProcessLayer";
import processStore from "../../store/processLayerStore";
import ProcessLayerTree from "./ProcessLayerTree.vue";

export default defineComponent({
  name: "business-process-tree",
  emits: ["change-layer"],
  data() {
    return {
      processLayerStore: processStore.state,
    };
  },
  computed: {
    businessProcesses(): ProcessLayer[] {
      return processStore.getBusinessProcesses();
    },
  },
  components: { ProcessLayerTree },
});
</script>
