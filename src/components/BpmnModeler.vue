<template>
  <div class="grid grid-cols-5">
    <div class="col-span-4">
      <ModelData
        :processType="processType"
        :activeProcessId="activeProcessId"
        class="mx-auto p-2"
      ></ModelData>
      <BpmnModelerCanvas
        :diagram="diagramXML"
        :layer="activeProcessId"
        @modeler-shown="modelerLoaded"
        @modeler-selection-changed="selectionChanged"
        @modeler-element-changed="elementChanged"
        @modeler-doubleclick="$emit('modeler-doubleclick', $event)"
        class="col-span-4 h-132"
      ></BpmnModelerCanvas>
    </div>
    <BpmnModelerPropertiesPanel
      class="col-span-1"
      v-if="modelerShown"
      :modeler="modeler"
      :element="element"
      :processLevel="currentProcessLevel"
      :rpaFlows="rpaFlows"
    ></BpmnModelerPropertiesPanel>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "modeler",
  emits: ["modeler-doubleclick"],
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
      modelerShown: false,
      modeler: undefined,
      selectedElements: [] as ModelerElement[],
      element: {} as ModelerElement,
      processLayerStore: processStore.state,
      rpaFlowStore: rpaFlowStore.state,
      diagramXML: defaultDiagram as string,
    };
  },
  methods: {
    selectionChanged(e: ModelerSelectionChange) {
      this.selectedElements = e.newSelection;
      if (e.newSelection.length > 0) {
        this.element = e.newSelection[0];
      } else {
        this.element = null;
      }
    },

    elementChanged(e: ModelerEvent) {
      this.saveDiagram();

      if (!this.element) {
        return;
      }
      if (this.element.businessObject.id === e.element.businessObject.id) {
        this.element = e.element;
      }
    },

    modelerLoaded(modeler): void {
      this.modeler = modeler;
      this.modelerShown = true;
    },

    saveDiagram: async function () {
      const diagramXML = await this.modeler.saveXML();
      if (this.processType === ProcessType.Business) {
        processStore.updateDiagramOfLayer(this.activeProcessId, diagramXML);
      } else {
        rpaFlowStore.updateDiagramOfFlow(this.activeProcessId, diagramXML);
      }
      // console.log(processStore.dump());
    },

    setNewDiagramXML(): void {
      let currentLayer;
      if (this.processType === ProcessType.Business) {
        currentLayer = processStore.getLayer(this.activeProcessId);
      } else {
        currentLayer = rpaFlowStore.getFlow(this.activeProcessId);
      }
      if (currentLayer && currentLayer.diagram) {
        this.diagramXML = currentLayer.diagram.xml;
      } else {
        this.diagramXML = "";
        this.diagramXML = defaultDiagram;
      }
    },
  },
  computed: {
    currentProcessLevel(): ProcessLevel {
      if (this.processType === ProcessType.RPA) {
        return ProcessLevel.Task;
      }
      const currentLevel = processStore.getLayer(this.activeProcessId)?.level;
      if (!currentLevel) {
        return ProcessLevel.Process;
      }
      return currentLevel;
    },
    rpaFlows(): RpaFlow[] {
      return this.rpaFlowStore.rpaFlows;
    },
  },
  watch: {
    activeProcessId: function (val) {
      // If the current layer changed, pass diagram xml to modeler canvas child.
      this.setNewDiagramXML();
    },
  },
});
</script>

<script setup lang="ts">
import { defineComponent, PropType } from "vue";
import BpmnModelerCanvas from "./BpmnModeler/BpmnModelerCanvas.vue";
import ModelData from "../components/ModelData.vue";

import BpmnModelerPropertiesPanel from "./BpmnModeler/BpmnModelerPropertiesPanel.vue";
import {
  ModelerElement,
  ModelerEvent,
  ModelerSelectionChange,
} from "../interfaces/ModelerEvents";
import processStore from "../store/processLayerStore";
import rpaFlowStore from "../store/rpaFlowStore";
import defaultDiagram from "../resources/defaultDiagram";
import { ProcessLevel } from "../interfaces/ProcessLayer";
import { ProcessType } from "../interfaces/BaseProcess";
import { RpaFlow } from "../interfaces/RpaFlow";
</script>
