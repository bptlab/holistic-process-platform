import { nanoid } from "nanoid";
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

export function generateNewBusinessProcess(): ProcessLayer {
  return {
    id: nanoid(8),
    parent: null,
    name: "New business process",
    level: ProcessLevel.Process,
  };
}
