import { reactive } from "vue";
import {
  generateBaseProcessLayer,
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
      const baseLayer = generateBaseProcessLayer();
      this.addLayer(baseLayer);
      this.setActiveLayer(baseLayer.id);
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
