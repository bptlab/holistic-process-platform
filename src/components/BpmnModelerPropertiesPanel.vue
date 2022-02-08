<template>
  <div v-if="element && element.businessObject">
    <div>
      {{ element.businessObject.$type }}
    </div>
    <hr />
    <div>Name: {{ element.businessObject.name || "" }}</div>
    <div>ID: {{ element.businessObject.id }}</div>
    <hr />
    <input
      type="text"
      :value="element.businessObject.name"
      placeholder="Label"
      @input="updateLabel"
    />
    <div v-if="element.businessObject.$type === 'bpmn:Task'">
      <o-field label="Library">
        <o-select
          placeholder="Select a library"
          @input="updateProperty($event, 'library')"
        >
          <option value="Excel" :selected="">Excel</option>
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
    <hr />
    <button @click="printCurrent">Print!</button>
  </div>
  <div v-else>Please select an element in the modeler.</div>
</template>

<script lang="ts">
import { defineComponent, markRaw, PropType, toRaw } from "vue";
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
