import { homedir } from "os";

import { ParameterDefault } from "../parameter-default";

/**
 * User path
 * Returns the value of `$HOME`
 */
export const userPath: ParameterDefault = {
  name: "userPath",
  getValue: async () => homedir(),
};
