import { existsSync, mkdirSync, writeFileSync } from "fs";

import { GeneratorOutput } from "./generator-output";

export function writeGeneratorOutput(generatorOutput: GeneratorOutput) {
  for (const folder of generatorOutput.folders) {
    if (!existsSync(folder.fullPath)) {
      mkdirSync(folder.fullPath);
      console.log(`📂 Created folder: ${folder.fullPath}.`);
    }
  }

  for (const file of generatorOutput.files) {
    writeFileSync(file.fullPath, file.content);
    console.log(`📂 Created file: ${file.fullPath}.`);
  }
}
