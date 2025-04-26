import { Command } from "commander";

import { packageInfo } from "../package-info";

import { cliRun, cliRunCommand } from "./run";
import { cliTemplatesCommand } from "./templates";

const program = new Command();

program
  .name(packageInfo.name)
  .description(packageInfo.description)
  .version(packageInfo.version)
  .addCommand(cliRunCommand)
  .addCommand(cliTemplatesCommand)
  .action(
    (
      ...[
        _,
        {
          args: [arg1],
        },
      ]
    ) => {
      cliRun(arg1);
    }
  );

export { program };
