import { reactive } from "vue";
import { generateNewRpaFlow, RpaFlow } from "../interfaces/RpaFlow";

export interface rpaFlowStoreState {
  rpaFlows: RpaFlow[];
}

const store = {
  state: reactive({
    rpaFlows: [] as RpaFlow[],
  }) as rpaFlowStoreState,

  addNewFlow(name?: string) {
    const newRpaFlow: RpaFlow = generateNewRpaFlow();
    if (name) {
      newRpaFlow.name = name;
    }
    this.addFlow(newRpaFlow);
  },

  addFlow(newFlow: RpaFlow): void {
    if (this.hasFlow(newFlow.id)) {
      throw new Error("There already exists a flow with this ID.");
    }
    this.state.rpaFlows.push(newFlow);
  },

  getFlow(flowId: string): RpaFlow | undefined {
    return this.state.rpaFlows.find((flow) => flow.id === flowId);
  },

  hasFlow(flowId: string): boolean {
    return this.state.rpaFlows.some((flow) => flow.id === flowId);
  },

  initialize(dump?: rpaFlowStoreState): void {
    this.clearStore();
    if (dump) {
      this.load(dump);
    }
  },

  clearStore(): void {
    this.state.rpaFlows = [];
  },

  dump(): string {
    return JSON.stringify(this.state);
  },

  load(dump: rpaFlowStoreState): void {
    this.state.rpaFlows = dump.rpaFlows;
  },
};

export default store;

// https://www.newline.co/30-days-of-vue/day-20-simple-global-store
// https://v3.vuejs.org/guide/state-management.html#simple-state-management-from-scratch
