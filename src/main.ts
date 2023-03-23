import * as core from '@actions/core'
import * as fs from 'fs'
import * as yaml from 'js-yaml'

function run(): void {
  try {
    // Get input parameters
    const filePath = core.getInput('filePath')
    const separator = core.getInput('separator')
    const exportEnvVariables = core.getBooleanInput('exportEnvVariables')

    // Read file content and parse it as YAML
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const yamlData: any = yaml.load(fileContent)

    // Flatten the object recursively
    const result = flattenObject(yamlData, {}, '', separator)

    // Set the output parameters
    for (const key of Object.keys(result)) {
      core.setOutput(key, result[key])

      if (exportEnvVariables) {
        core.exportVariable(key, result[key].toString())
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export function flattenObject(
  obj: any,
  result: any,
  prefix = '',
  separator = '__'
): any {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      flattenObject(obj[key], result, `${prefix}${key}${separator}`, separator)
      continue
    }

    result[prefix + key] = obj[key]
  }

  return result
}

run()
