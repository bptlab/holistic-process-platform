<template>
  <div class="m-4">
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
        v-if="
          element.businessObject.$type === 'bpmn:Task' && processLevel === 3
        "
      >
        <o-field label="Library">
          <o-select placeholder="Select a library" v-model="currentLibrary">
            <option
              v-for="library in getAvailableRPALibraries()"
              :value="library"
            >
              {{ library }}
            </option>
          </o-select>
        </o-field>
        <o-field label="Keyword">
          <o-select placeholder="Select a keyword" v-model="currentKeyword">
            <option
              v-for="keyword in getAvailableRPAKeywordsForCurrentLibrary()"
              :value="keyword"
            >
              {{ keyword }}
            </option>
          </o-select>
        </o-field>
        <o-field
          v-for="config in getConfigForCurrentKeyword()"
          :label="config.name"
        >
          <o-switch v-if="config.type === 'Boolean'">{{
            config.infoText
          }}</o-switch>
          <o-input
            v-else-if="config.type === 'String'"
            type="text"
            :placeholder="config.infoText"
          ></o-input>
          <o-input
            v-else-if="config.type === 'Integer'"
            type="number"
            :placeholder="config.infoText"
          ></o-input>
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
              v-model="currentFlowLink"
            >
              <option v-for="flow in rpaFlows" :value="flow.id">
                {{ flow.name }}
              </option>
            </o-select>
          </o-field>
        </div>
        <div v-else>
          There are no RPA Flows to reference in the repository. Please add an
          RPA flow first.
        </div>
      </div>
    </div>
    <div v-else>Please select an element in the modeler.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw, PropType, toRaw } from "vue";
import { RpaFlow } from "../../interfaces/RpaFlow";
import { ModelerElement } from "../interfaces/ModelerEvents";
import rfCommands from "../../utils/rfKeywordParser";
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
  data() {
    return {
      currentLibrary: "" as string | undefined,
      currentKeyword: "" as string | undefined,
      currentFlowLink: "" as string | undefined,
    };
  },
  methods: {
    updateLabel(event: Event): void {
      if (!event.currentTarget) {
        return;
      }
      const modeling = this.modeler.get("modeling");
      modeling.updateLabel(toRaw(this.element), event.currentTarget.value);
    },
    updateProperty(property: string, value: string): void {
      const modeling = this.modeler.get("modeling");
      const propertyKey = "rpa:" + property;
      const newProperty = {};
      newProperty[propertyKey] = value;

      modeling.updateProperties(toRaw(this.element), newProperty);
    },
    printCurrent(): void {
      console.log(this.element?.businessObject);
    },
    getCurrentBusinessObject() {
      if (!this.element || !this.element.id) {
        return;
      }
      const elementRegistry = this.modeler.get("elementRegistry");
      return elementRegistry.get(this.element.id).businessObject;
    },
    getRPAFlowLink(): string | undefined {
      const elementBO = this.getCurrentBusinessObject();
      if (elementBO && "rpa:flow-link" in elementBO.$attrs) {
        return elementBO.$attrs["rpa:flow-link"];
      }
    },
    getRPALibrary(): string | undefined {
      const elementBO = this.getCurrentBusinessObject();
      if (elementBO && "rpa:library" in elementBO.$attrs) {
        return elementBO.$attrs["rpa:library"];
      }
    },
    getRPAKeyword(): string | undefined {
      const elementBO = this.getCurrentBusinessObject();
      if (elementBO && "rpa:keyword" in elementBO.$attrs) {
        return elementBO.$attrs["rpa:keyword"];
      }
    },
    getAvailableRPALibraries(): string[] {
      return Object.keys(rfCommands);
    },
    getAvailableRPAKeywordsForCurrentLibrary(): string[] {
      if (!this.currentLibrary) {
        return [];
      }
      return Object.keys(rfCommands[this.currentLibrary]);
    },
    getConfigForCurrentKeyword(): object[] {
      if (!this.currentLibrary || !this.currentKeyword) {
        return [];
      }
      return rfCommands[this.currentLibrary][this.currentKeyword];
    },
  },
  watch: {
    element() {
      this.currentLibrary = this.getRPALibrary();
      this.currentKeyword = this.getRPAKeyword();
      this.currentFlowLink = this.getRPAFlowLink();
    },
    currentLibrary() {
      if (this.element && this.currentLibrary) {
        this.updateProperty("library", this.currentLibrary);
      }
    },
    currentKeyword() {
      if (this.element && this.currentKeyword) {
        this.updateProperty("keyword", this.currentKeyword);
      }
    },
    currentFlowLink() {
      if (this.element && this.currentFlowLink) {
        this.updateProperty("flow-link", this.currentFlowLink);
      }
    },
  },
});
</script>
