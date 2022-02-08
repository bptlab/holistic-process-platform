import BPMNModdle from "bpmn-moddle";

export interface ModelerSelectionChange {
  newSelection: Array<ModelerElement>;
  oldSelection: Array<ModelerElement>;
}

export interface ModelerEvent {
  element: ModelerElement;
  gfx: any;
  type: string;
}

export interface ModelerElement {
  businessObject: BPMNModdle.FlowNode;
}

export interface BPMNElement extends BPMNModdle.FlowNode {}
