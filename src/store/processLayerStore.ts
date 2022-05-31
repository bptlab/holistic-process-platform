import { nanoid } from "nanoid";
import { reactive } from "vue";
import {
  generateNewBusinessProcess,
  ProcessLayer,
} from "../interfaces/ProcessLayer";

export interface processLayerStoreState {
  processLayers: ProcessLayer[];
  activeLayer: string;
}

const store = {
  state: reactive({
    processLayers: [] as ProcessLayer[],
    activeLayer: "",
  }) as processLayerStoreState,

  addBusinessProcess(name?: string) {
    const newBusinessProcess: ProcessLayer = generateNewBusinessProcess();
    if (name) {
      newBusinessProcess.name = name;
    }
    this.addLayer(newBusinessProcess);
    this.setActiveLayer(newBusinessProcess.id);
  },

  addLayer(newLayer: ProcessLayer): void {
    if (this.hasLayer(newLayer.id)) {
      throw new Error("There already exists a layer with this ID.");
    }
    this.state.processLayers.push(newLayer);
  },

  getLayer(layerId: string): ProcessLayer | undefined {
    return this.state.processLayers.find((layer) => layer.id === layerId);
  },

  hasLayer(layerId: string): boolean {
    return this.state.processLayers.some((layer) => layer.id === layerId);
  },

  setActiveLayer(layerId: string): void {
    if (!this.hasLayer(layerId)) {
      throw new Error("There exists no layer with this ID.");
    }
    this.state.activeLayer = layerId;
  },

  getActiveLayer(): ProcessLayer | undefined {
    return this.getLayer(this.state.activeLayer);
  },

  getBusinessProcesses(): ProcessLayer[] {
    return this.state.processLayers.filter((layer) => layer.parent === null)!;
  },

  getLayersOfBusinessProcess(businessProcessLayerId: string): ProcessLayer[] {
    let intermediateLayerIds = [businessProcessLayerId];
    let processLayers: ProcessLayer[] = [];

    while (intermediateLayerIds.length > 0) {
      const intermediateLayerId = intermediateLayerIds.pop();
      const sublayersOfIntermediateLayerId = this.state.processLayers.filter(
        (layer) => layer.parent === intermediateLayerId
      );
      processLayers = processLayers.concat(sublayersOfIntermediateLayerId);
      intermediateLayerIds = intermediateLayerIds.concat(
        sublayersOfIntermediateLayerId.map((sublayer) => sublayer.id)
      );
    }
    return processLayers;
  },

  updateActiveDiagram(diagramXML: string): void {
    const activeLayer = this.getActiveLayer();
    if (!activeLayer) {
      return;
    }
    activeLayer.diagram = diagramXML;
  },

  updateActiveLayerName(name: string): void {
    const activeLayer = this.getActiveLayer();
    if (!activeLayer) {
      return;
    }
    activeLayer.name = name;
  },

  initialize(dump?: processLayerStoreState): void {
    this.clearStore();
    if (dump) {
      this.load(dump);
    } else {
      this.addBusinessProcess("Initial Business Process");
    }
  },

  clearStore(): void {
    this.state.processLayers = [];
  },

  dump(): string {
    return JSON.stringify(this.state);
  },

  load(dump: processLayerStoreState): void {
    this.state.processLayers = dump.processLayers;
    this.state.activeLayer = dump.activeLayer;
  },
};

export default store;

// https://www.newline.co/30-days-of-vue/day-20-simple-global-store
// https://v3.vuejs.org/guide/state-management.html#simple-state-management-from-scratch
