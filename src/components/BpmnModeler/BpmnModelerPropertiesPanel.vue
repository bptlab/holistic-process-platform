<template>
  <div v-if="element && element.businessObject">
    <div class="text-center">
      {{ element.businessObject.$type }}
    </div>
    <hr />
    <o-field label="Name">
      <o-input
        type="text"
        v-model="element.businessObject.name"
        placeholder="Label"
        @input="updateLabel"
      />
    </o-field>
    <o-field label="ID">
      <o-input
        type="text"
        :placeholder="element.businessObject.id"
        disabled
      ></o-input>
    </o-field>
    <hr />
    <div
      v-if="element.businessObject.$type === 'bpmn:Task' && processLevel === 3"
    >
      <o-field label="Library">
        <o-select
          placeholder="Select a library"
          @input="updateProperty($event, 'library')"
        >
          <option value="Excel">Excel</option>
          <option value="Word">Word</option>
          <option value="FireFox">FireFox</option>
        </o-select>
      </o-field>
      <o-field label="Keyword">
        <o-select
          placeholder="Select a keyword"
          @input="updateProperty($event, 'keyword')"
        >
          <option value="Open File">Open File</option>
          <option value="Write Cell">Write Cell</option>
          <option value="Get Cell">Get Cell</option>
        </o-select>
      </o-field>
    </div>
    <div
      v-if="
        element.businessObject.$type === 'bpmn:CallActivity' &&
        processLevel === 2
      "
    >
      <div v-if="rpaFlows.length > 0">
        <o-field label="RPA Flow Reference">
          <o-select
            placeholder="Select an RPA Flow"
            @input="updateProperty($event, 'flow-link')"
          >
            <option v-for="flow in rpaFlows" :value="flow.id">
              {{ flow.name }}
            </option>
          </o-select>
        </o-field>
      </div>
      <div v-else>
        There are no RPA Flows to reference in the repository. Please add an RPA
        flow first.
      </div>
    </div>
  </div>
  <div v-else>Please select an element in the modeler.</div>
</template>

<script lang="ts">
import { defineComponent, markRaw, PropType, toRaw } from "vue";
import { ProcessLevel } from "../../interfaces/ProcessLayer";
import { RpaFlow } from "../../interfaces/RpaFlow";
import { ModelerElement } from "../interfaces/ModelerEvents";
export default defineComponent({
  name: "bpmn-modeler-properties-panel",
  props: {
    modeler: {
      type: Object,
      required: true,
    },
    element: {
      type: Object as PropType<ModelerElement>,
      required: false,
    },
    processLevel: {
      type: Number,
      required: true,
    },
    rpaFlows: {
      type: Array as PropType<Array<RpaFlow>>,
      required: true,
    },
  },
  methods: {
    updateLabel(event: Event): void {
      if (!event.currentTarget) {
        return;
      }
      const modeling = this.modeler.get("modeling");
      modeling.updateLabel(toRaw(this.element), event.currentTarget.value);
    },
    updateProperty(event: Event, property: string): void {
      if (!event.currentTarget) {
        return;
      }
      const modeling = this.modeler.get("modeling");
      const propertyKey = "rpa:" + property;
      const newProperty = {};
      newProperty[propertyKey] = event.currentTarget.value;

      modeling.updateProperties(toRaw(this.element), newProperty);
    },
    printCurrent(): void {
      console.log(this.element?.businessObject);
    },
  },
  computed: {
    selectedLibrary(): string {},
  },
});
</script>
