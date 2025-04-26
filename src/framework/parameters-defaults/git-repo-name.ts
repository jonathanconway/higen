import { simpleGit } from "simple-git";

import { ParameterDefault } from "../parameter-default";

const git = simpleGit({
  baseDir: process.cwd(),
});

/**
 * Git repo name
 * Finds the first remote and its first ref and extracts the last fragment of the ref URL and returns that
 */
export const gitRepoName: ParameterDefault = {
  name: "gitRepoName",
  getValue: async () => {
    const remotes = await git.getRemotes(true);
    const remoteRefs = Object.values(remotes[0].refs);
    const remoteRefFirst = remoteRefs[0];
    const remoteRefFirstRepoLastFragment = remoteRefFirst.split("/").pop();
    return remoteRefFirstRepoLastFragment ?? "";
  },
};
