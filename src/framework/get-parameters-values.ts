import * as parametersDefaultsBarrel from "./parameters-defaults";

interface GetParametersValuesParams {
  readonly parametersTemplateNames: readonly string[];

  // readonly parametersCommandLineByName: Record<string, string>;
}

export async function getParametersValues({
  parametersTemplateNames,
}: GetParametersValuesParams) {
  // Get defaults
  const parametersDefault = Object.fromEntries(
    await Promise.all(
      Object.values(parametersDefaultsBarrel)
        .filter((parameterDefault) =>
          parametersTemplateNames.includes(parameterDefault.name)
        )
        .map(async ({ name, getValue }) => [name, await getValue()])
    )
  ) as Record<string, string>;

  // Override by command line

  // Return result
  return parametersDefault;
}
