<template>
  <div class="bg-sky-700 text-center text-slate-200 py-12">
    <h1 class="text-4xl font-bold">RPA Bot Modeler</h1>
  </div>
  <hr />
  <div class="grid grid-cols-7 min-h-screen">
    <div class="col-span-1 shadow-lg p-2">
      <ModelTree @change-level="navigateLevel" />
    </div>
    <div class="col-span-6 p-2">
      <ModelBreadcrumb
        :levels="levels"
        @change-level="navigateLevel"
      ></ModelBreadcrumb>

      <hr />
      <BpmnModeler @modeler-doubleclick="openSubLevel"></BpmnModeler>
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
      levels: ["Base"],
    };
  },
  mounted() {
    processStore.initialize(exampleProcessLandscape);
  },
  methods: {
    openSubLevel(e: ModelerEvent): void {
      if (!(e.element.businessObject.$type === "bpmn:SubProcess")) {
        return;
      }
      const subprocessId = e.element.businessObject.id;

      if (!processStore.hasLayer(subprocessId)) {
        const newLayer: ProcessLayer = {
          id: subprocessId,
          parent: processStore.getActiveLayer().id,
        };
        if (e.element.businessObject.name) {
          newLayer.name = e.element.businessObject.name;
        }
        processStore.addLayer(newLayer);
        this.levels.push(subprocessId);
        console.log("open new subprocess with id " + subprocessId);
      }
      this.navigateLevel(subprocessId);
    },
    navigateLevel(level: string) {
      this.currentLevel = level;
      console.log(`Asked to change level to ${level}`);
      processStore.setActiveLayer(level);
    },
    getVisibilityStyle(level: string): string {
      if (level === this.currentLevel) {
        return "display: block";
      }
      return "display: none";
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
</script>
