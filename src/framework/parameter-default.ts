export interface ParameterDefault {
  readonly name: string;
  readonly getValue: () => Promise<string>;
}
