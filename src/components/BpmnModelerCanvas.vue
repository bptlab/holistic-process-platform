<!-- Adapted from https://github.com/bpmn-io/vue-bpmn/blob/master/src/index.vue -->

<template>
  <div ref="container-modeler"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import BpmnModeler from "bpmn-js/lib/modeler";
// https://github.com/bpmn-io/bpmn-js-properties-panel/issues/308#issuecomment-505020061
// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule,
// } from "bpmn-js-properties-panel";
import rpaExtension from "../resources/rpaExtension.json";

import { markRaw } from "vue";
import {
  ModelerEvent,
  ModelerSelectionChange,
} from "../interfaces/ModelerEvents";

export default defineComponent({
  name: "vue-bpmn",
  props: {
    diagram: {
      type: String,
      required: true,
    },
    layer: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
    },
  },
  emits: [
    "modeler-doubleclick",
    "modeler-element-changed",
    "modeler-selection-changed",
    "modeler-loading",
    "modeler-error",
    "modeler-shown",
  ],
  data() {
    return {
      modeler: null as any,
    };
  },
  mounted() {
    var self = this;
    var _options = Object.assign(
      {
        container: this.$refs["container-modeler"],
        keyboard: {
          bindTo: window,
        },
        moddleExtensions: {
          rpa: rpaExtension,
        },
      },
      this.options
    );
    this.modeler = markRaw(new BpmnModeler(_options));
    this.modeler.on("import.done", (event) => {
      var error = event.error;
      // var warnings = event.warnings;
      if (error) {
        self.$emit("modeler-error", error);
      } else {
        self.$emit("modeler-shown", this.modeler);
      }
      self.modeler.get("canvas").zoom("fit-viewport");
    });
    this.modeler.on("element.dblclick", (event: ModelerEvent) => {
      self.$emit("modeler-doubleclick", event);
    });
    this.modeler.on("element.changed", (event: ModelerEvent) => {
      self.$emit("modeler-element-changed", event);
    });
    this.modeler.on("selection.changed", (event: ModelerSelectionChange) => {
      // Only emit an event if the selection actually changed, not with every click
      if (event.oldSelection.length === 0 && event.newSelection.length === 0) {
        return;
      }
      self.$emit("modeler-selection-changed", event);
    });
    this.loadDiagram();
  },
  beforeDestroy() {
    this.modeler.destroy();
  },
  watch: {
    layer: function (val) {
      // We need to watch the layer and not the diagram XML directly,
      // as the latter might not change because changes in the modeler are not directly reflected in this property.
      this.loadDiagram();
    },
  },
  methods: {
    loadDiagram: function () {
      console.log("[CANVAS] Loading diagram.");
      this.modeler.importXML(this.diagram);
    },
  },
});
</script>

<style src="bpmn-js/dist/assets/diagram-js.css"></style>
<style src="bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"></style>
<style src="bpmn-js-properties-panel/dist/assets/properties-panel.css"></style>
