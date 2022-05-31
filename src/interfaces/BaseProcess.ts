export interface BaseProcess {
  id: string;
  name: string;
  diagram?: string;
}

export enum ProcessType {
  Business,
  RPA,
}
