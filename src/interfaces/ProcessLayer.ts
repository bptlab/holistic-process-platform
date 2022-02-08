export interface ProcessLayer {
  id: string;
  parent: string | null;
  name: string;
  diagram?: string;
}

export const BASE_LAYER_ID = "Base";

export function generateBaseProcessLayer(): ProcessLayer {
  return {
    id: BASE_LAYER_ID,
    parent: null,
    name: "Processbase",
  };
}
