import * as core from '@actions/core'
import * as yaml from 'js-yaml';
import * as fs from 'fs';

async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput('filePath');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data : any = yaml.load(fileContents);
    for (const property in data) {
      core.setOutput(property, data[property]);
    }
  } catch (error) {
    if (error instanceof Error)
      core.setFailed(error.message);
  }
}

run();
