import { GeneratorOutputFile } from "./generator-output-file";
import { GeneratorOutputFolder } from "./generator-output-folder";

export interface GeneratorOutput {
  readonly folders: readonly GeneratorOutputFolder[];
  readonly files: readonly GeneratorOutputFile[];
}
