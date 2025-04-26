#! /usr/bin/env node
import chalk from "chalk";

import { packageInfo } from "../package-info";

import { program } from "./cli";

const { name, version } = packageInfo;

console.log(`
⚙️ ${chalk.whiteBright(name)} ${version} 
`);

program.parse();
