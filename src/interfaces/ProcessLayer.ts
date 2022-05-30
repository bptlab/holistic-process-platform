export enum ProcessLevel {
  Process = 1,
  Activity,
  Task,
}

export interface ProcessLayer {
  id: string;
  parent: string | null;
  name: string;
  diagram?: string;
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
