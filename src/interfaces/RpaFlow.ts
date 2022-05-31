import { nanoid } from "nanoid";
import { BaseProcess } from "./BaseProcess";

export interface RpaFlow extends BaseProcess {
  attended: boolean;
}

export function generateNewRpaFlow(): RpaFlow {
  return {
    id: nanoid(8),
    name: "New RPA Flow",
    attended: true,
  };
}
