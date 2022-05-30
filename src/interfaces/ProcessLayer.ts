import { BaseProcess } from "./BaseProcess";

export enum ProcessLevel {
  Process = 1,
  Activity,
  Task,
}

export interface ProcessLayer extends BaseProcess {
  parent: string | null;
  level: ProcessLevel;
}

export const BASE_LAYER_ID = "Base";

export function generateBaseProcessLayer(): ProcessLayer {
  return {
    id: BASE_LAYER_ID,
    parent: null,
    name: "Processbase",
    level: ProcessLevel.Process,
  };
}
