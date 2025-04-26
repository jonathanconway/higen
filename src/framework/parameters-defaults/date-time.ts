import { ParameterDefault } from "../parameter-default";

/**
 * Date time
 * Returns the current date and time as a formatted string
 * @example
 */
export const dateTime: ParameterDefault = {
  name: "dateTime",
  getValue: async () => {
    const now = new Date(Date.now());
    const dateString = now.toDateString();
    const timeString = now.toTimeString().split(" ")[0];
    return `${dateString} ${timeString}`;
  },
};
