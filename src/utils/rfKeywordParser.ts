import rpaTasks from "../resources/rpa-tasks.json";

const rfCommands: Record<string, Record<string, Object[]>> = {};

rpaTasks.forEach((task) => {
  if (!(task.application in rfCommands)) {
    rfCommands[task.application] = {};
  }
  rfCommands[task.application][task.code] = task.inputVars;
});

export default rfCommands;
