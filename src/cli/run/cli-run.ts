import { createCommand } from "commander";

import { runGenerator } from "../../framework/run-generator";

export const cliRunCommand = createCommand("run")
  .description("Run a generator")
  .argument("generatorName", "Name of generator to run")
  .action(cliRun);

type RunParameter = string /* generatorName */;

export async function cliRun(generatorName: RunParameter) {
  runGenerator(generatorName);
}
