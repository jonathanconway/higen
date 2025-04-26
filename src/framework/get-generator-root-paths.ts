import { homedir } from "os";
import { join } from "path";
import { cwd } from "process";

import { packageInfo } from "../package-info";

export function getGeneratorRootPaths() {
  const runningPath = __dirname;

  const folderName = packageInfo.name;

  const rootPaths = [
    `${join(runningPath, "/../..")}/.${folderName}`,
    `${cwd()}/.${folderName}`,
    `${homedir()}/.${folderName}`,
  ];

  return rootPaths;
}
