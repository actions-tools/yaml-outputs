import * as core from '@actions/core'
import * as fs from 'fs'
import {flattenObject, getYamlData} from './utils'

try {
  // Get input parameters
  const filePath = core.getInput('file-path')
  const separator = core.getInput('separator')
  const node = core.getInput('node')
  const exportEnvVariables = core.getBooleanInput('export-env-variables')

  // Read file content and parse it as YAML
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const yamlData: any = getYamlData(fileContent, node)

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
