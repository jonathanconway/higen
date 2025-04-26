import { simpleGit } from "simple-git";

import { ParameterDefault } from "../parameter-default";

const git = simpleGit({
  baseDir: process.cwd(),
});

/**
 * Git branch name
 * Returns the current branch name
 */
export const gitBranchName: ParameterDefault = {
  name: "gitBranchName",
  getValue: async () => (await git.branch()).current.toString(),
};
