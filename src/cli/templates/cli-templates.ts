import { createCommand } from "commander";
import { existsSync, readdirSync } from "fs";

import { getGeneratorRootPaths } from "../../framework/get-generator-root-paths";

export const cliTemplatesCommand = createCommand("templates")
  .description("View the list of available templates")
  .action(cliTemplates);

export async function cliTemplates() {
  const templates = [];

  for (const rootPath of getGeneratorRootPaths()) {
    if (!existsSync(rootPath)) {
      continue;
    }

    templates.push(
      ...readdirSync(rootPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
    );
  }

  console.log("List of templates:");
  for (const template of templates) {
    console.log(`• ${template}`);
  }
}
