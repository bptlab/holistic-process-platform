<template>
  <div>
    <o-field :label="inputLabel">
      <o-input type="text" v-model="currentProcessName" @input="updateName" />
    </o-field>
  </div>
</template>

<script lang="ts">
import { BaseProcess, ProcessType } from "../interfaces/BaseProcess";
import { defineComponent, PropType } from "vue";
import processStore from "../store/processLayerStore";
import rpaFlowStore from "../store/rpaFlowStore";
export default defineComponent({
  name: "model-data",
  props: {
    processType: {
      type: Number as PropType<ProcessType>,
      required: true,
    },
    activeProcessId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      processLayerStore: processStore.state,
      rpaFlowStore: rpaFlowStore.state,
      currentProcessName: "",
    };
  },
  mounted() {
    this.currentProcessName = this.getCurrentProcessName();
  },
  methods: {
    updateName(event) {
      if (!event.currentTarget) {
        return;
      }
      if (this.processType === 0) {
        processStore.updateLayerName(
          this.activeProcessId,
          event.currentTarget.value
        );
      } else {
        rpaFlowStore.updateFlowName(
          this.activeProcessId,
          event.currentTarget.value
        );
      }
    },
    getCurrentProcessName(): string {
      let activeLayer: BaseProcess;

      if (this.processType === 0) {
        activeLayer = processStore.getLayer(this.activeProcessId)!;
      } else {
        activeLayer = rpaFlowStore.getFlow(this.activeProcessId)!;
      }

      if (!activeLayer) {
        return "";
      }
      if (activeLayer.name) {
        return activeLayer.name;
      }
      return activeLayer.id;
    },
  },
  computed: {
    inputLabel(): string {
      let label = "Name of ";
      if (this.processType === 0) {
        label = label + "Process";
      } else {
        label = label + "Flow";
      }
      return label;
    },
  },
  watch: {
    activeProcessId: function (val) {
      this.currentProcessName = this.getCurrentProcessName();
    },
  },
});
</script>

<style>
ul > li {
  margin-left: 10px;
}
</style>
