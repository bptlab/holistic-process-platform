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
        @new-flow="addNewRpaFlow"
      ></NavigationSidebar>
    </div>
    <div class="col-span-6 p-2">
      <ModelBreadcrumb
        :levels="levels"
        @change-level="navigateLayer"
      ></ModelBreadcrumb>

      <hr />
      <BpmnModeler @modeler-doubleclick="openSubLayer"></BpmnModeler>
      <hr />
      <ModelData></ModelData>
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
    };
  },
  mounted() {
    // processStore.initialize(exampleProcessLandscape);
    processStore.initialize();
  },
  methods: {
    openSubLayer(e: ModelerEvent): void {
      if (!(e.element.businessObject.$type === "bpmn:SubProcess")) {
        return;
      }
      const subprocessId = e.element.businessObject.id;

      if (!processStore.hasLayer(subprocessId)) {
        const currentLayer = processStore.getActiveLayer();
        if (!currentLayer) {
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
        console.log("open new subprocess with id " + subprocessId);
      }
      this.navigateLayer(subprocessId);
    },
    navigateLayer(layer: string) {
      // this.currentLevel = level;
      console.log(`Asked to change layer to ${layer}`);
      processStore.setActiveLayer(layer);
    },
    addNewBusinessProcess() {
      processStore.addBusinessProcess();
    },
    addNewRpaFlow() {
      rpaFlowStore.addNewFlow();
    },
  },
});
</script>

<script setup lang="ts">
import { defineComponent, PropType } from "vue";
import BpmnModeler from "../components/BpmnModeler.vue";
import ModelBreadcrumb from "../components/ModelBreadcrumb.vue";
import ModelTree from "../components/ModelTree.vue";
import ModelData from "../components/ModelData.vue";
import exampleProcessLandscape from "../resources/exampleProcessLandscape.json";
import {
  ModelerElement,
  ModelerEvent,
  ModelerSelectionChange,
} from "../interfaces/ModelerEvents";
import {
  generateBaseProcessLayer,
  ProcessLayer,
} from "../interfaces/ProcessLayer";
import processStore from "../store/processLayerStore";
import rpaFlowStore from "../store/rpaFlowStore";
import NavigationSidebar from "../components/NavigationSidebar.vue";
</script>
