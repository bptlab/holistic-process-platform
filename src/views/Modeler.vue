<template>
  <div class="bg-sky-700 text-center text-slate-200 py-12">
    <h1 class="text-4xl font-bold">RPA Bot Modeler</h1>
  </div>
  <hr />
  <div class="grid grid-cols-7 min-h-screen">
    <div class="col-span-1 shadow-lg p-2">
      <NavigationSidebar
        @change-layer="navigateLayer"
        @new-process="addNewBusinessProcess"
        @change-flow="navigateRpaFlow"
        @new-flow="addNewRpaFlow"
      ></NavigationSidebar>
    </div>
    <div class="col-span-6 p-2">
      <!-- <ModelBreadcrumb
        :levels="levels"
        @change-level="navigateLayer"
      ></ModelBreadcrumb>

      <hr /> -->
      <BpmnModeler
        :processType="processType"
        :activeProcessId="activeProcessId"
        @modeler-doubleclick="openSubLayer"
      ></BpmnModeler>
      <hr />
      <ModelData
        :processType="processType"
        :activeProcessId="activeProcessId"
      ></ModelData>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "modeler",
  data() {
    return {
      processLayerStore: processStore.state,
      rpaFlowStore: rpaFlowStore.state,
      levels: ["Base"],
      processType: ProcessType.Business,
      activeProcessId: "",
    };
  },
  mounted() {
    processStore.initialize(exampleBPR);
    rpaFlowStore.initialize(exampleRFR);

    this.activeProcessId = processStore.getBusinessProcesses()[0].id;
  },
  methods: {
    openSubLayer(e: ModelerEvent): void {
      if (!(e.element.businessObject.$type === "bpmn:SubProcess")) {
        return;
      }
      const subprocessId = e.element.businessObject.id;

      if (!processStore.hasLayer(subprocessId)) {
        const currentLayer = processStore.getLayer(this.activeProcessId);

        if (!currentLayer) {
          return;
        }
        if (currentLayer.level === ProcessLevel.Task) {
          this.$oruga.notification.open({
            message: "You already are at task level!",
            variant: "danger",
            position: "bottom",
            duration: 2000,
          });
          return;
        }
        const newLayer: ProcessLayer = {
          id: subprocessId,
          name: e.element.businessObject.name || "",
          parent: currentLayer.id,
          level: currentLayer.level + 1,
        };

        processStore.addLayer(newLayer);
        this.levels.push(subprocessId);
        // console.log("open new subprocess with id " + subprocessId);
      }

      this.navigateLayer(subprocessId);
    },
    navigateLayer(layer: string) {
      // this.currentLevel = level;
      console.log(`Asked to change to business process layer ${layer}`);
      this.processType = ProcessType.Business;
      this.activeProcessId = layer;
      console.log(processStore.dump());
      console.log(rpaFlowStore.dump());
    },
    addNewBusinessProcess() {
      processStore.addBusinessProcess();
    },
    addNewRpaFlow() {
      rpaFlowStore.addNewFlow();
    },
    navigateRpaFlow(flowId: string) {
      // console.log(`Asked to change to RPA flow ${flowId}`);
      this.processType = ProcessType.RPA;
      this.activeProcessId = flowId;
    },
  },
});
</script>

<script setup lang="ts">
import { defineComponent, PropType } from "vue";
import BpmnModeler from "../components/BpmnModeler.vue";
import ModelBreadcrumb from "../components/ModelBreadcrumb.vue";
import ModelData from "../components/ModelData.vue";
import exampleBPR from "../resources/exampleBPR.json";
import exampleRFR from "../resources/exampleRFR.json";
import {
  ModelerElement,
  ModelerEvent,
  ModelerSelectionChange,
} from "../interfaces/ModelerEvents";
import { ProcessLayer, ProcessLevel } from "../interfaces/ProcessLayer";
import processStore from "../store/processLayerStore";
import rpaFlowStore from "../store/rpaFlowStore";
import NavigationSidebar from "../components/NavigationSidebar.vue";
import { ProcessType } from "../interfaces/BaseProcess";
</script>
