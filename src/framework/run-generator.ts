import { existsSync, lstatSync, readFileSync, readdirSync } from "fs";
import { uniq } from "lodash";
import { parse, render } from "mustache";

import { GeneratorOutput } from "./generator-output";
import { GeneratorOutputFile } from "./generator-output-file";
import { GeneratorOutputFolder } from "./generator-output-folder";
import { getGeneratorRootPaths } from "./get-generator-root-paths";
import { getParametersValues } from "./get-parameters-values";
import { isNotNil } from "./utils";
import { writeGeneratorOutput } from "./write-generator-output";

function getWhichPath(generatorName: string) {
  const whichPathCandidates = getGeneratorRootPaths().map(
    (rootPath) => `${rootPath}/${generatorName}`
  );

  return whichPathCandidates.find((path) => existsSync(path));
}

export function runGenerator(generatorName: string) {
  const path = getWhichPath(generatorName);
  if (!path) {
    throw new Error(`Cannot find generator ${generatorName}`);
  }

  console.log(`Running ${generatorName}...\n`);

  parseGeneratorFoldersFiles(path);
}

export async function parseGeneratorFoldersFiles(rootPath: string) {
  const foldersFiles = readdirSync(rootPath, {
    recursive: true,
  }).map(String);

  const parametersTemplateNames = parseFoldersFilesParameterNames(
    foldersFiles,
    rootPath
  );

  const parameterValuesByName = await getParametersValues({
    parametersTemplateNames,
  });

  const foldersFilesParametersValues = fillFoldersFilesParametersValues({
    rootPath,
    foldersFiles,
    parameterValuesByName,
  });

  writeGeneratorOutput(foldersFilesParametersValues);

  console.log(`\nCompleted generation.\n`);
}

function fillFoldersFilesParametersValues({
  rootPath,
  foldersFiles,
  parameterValuesByName,
}: {
  rootPath: string;
  foldersFiles: readonly string[];
  parameterValuesByName: Record<string, string>;
}): GeneratorOutput {
  const folders: GeneratorOutputFolder[] = [];
  const files: GeneratorOutputFile[] = [];

  for (const folderFile of foldersFiles) {
    if (folderFile.endsWith(".DS_Store")) {
      continue;
    }

    const templateFullPath = rootPath + "/" + folderFile;

    const fullPath = render(folderFile, parameterValuesByName, undefined, {
      escape: (f) => f,
    }).toString();

    if (lstatSync(templateFullPath).isDirectory()) {
      folders.push({ fullPath });
    } else {
      const templateContent = readFileSync(templateFullPath).toString();
      const content = render(
        templateContent,
        parameterValuesByName,
        undefined,
        {
          escape: (f) => f,
        }
      ).toString();

      files.push({
        fullPath,
        content,
      });
    }
  }

  return {
    folders,
    files,
  };
}

// todo: cache
function isDirectory(folderFilePathName: string) {
  return lstatSync(folderFilePathName).isDirectory();
}

function parseTokens(content: string) {
  return parse(content)
    .filter(([tokenType]) => tokenType === "name")
    .map(([_, tokenValue]) => tokenValue);
}

function parseFoldersFilesParameterNames(
  foldersFiles: readonly string[],
  rootPath: string
) {
  const folderOrFileNameMatches = foldersFiles
    .map((folderFile) => {
      const folderFileTokens = parseTokens(folderFile);

      const fullFolderFilePathName = `${rootPath}/${folderFile}`;
      const fileContentTokens = !isDirectory(fullFolderFilePathName)
        ? parseTokens(readFileSync(fullFolderFilePathName).toString())
        : [];

      return [...folderFileTokens, ...fileContentTokens];
    })
    .filter(isNotNil)
    .flat();

  const folderOrFileNameMatchesUniq = uniq(folderOrFileNameMatches);

  return folderOrFileNameMatchesUniq;
}
