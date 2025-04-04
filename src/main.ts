import * as core from '@actions/core'
import * as fs from 'fs'
import {flattenObject, getYamlData} from './utils'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Get input parameters
    const filePath = core.getInput('file-path')
    const separator = core.getInput('separator')
    const node = core.getInput('node')
    const exportEnvVariables = core.getBooleanInput('export-env-variables')
    const failOnFileNotFoundInput = core.getInput('fail-on-file-not-found', {
      required: false
    })
    const failOnFileNotFound =
      failOnFileNotFoundInput.trim().toLowerCase() === 'true'

    let fileContent
    try {
      // Read file content and parse it as YAML
      fileContent = fs.readFileSync(filePath, 'utf8')
    } catch (error) {
      if (failOnFileNotFound) throw error
      else {
        core.debug('file-path was not found')
        process.exit(0)
      }
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const yamlData: any = getYamlData(fileContent, node)

    // Flatten the object recursively
    const result = flattenObject(yamlData, {}, '', separator)

    // Set the output parameters
    for (const key of Object.keys(result)) {
      // null / undefined values are set to empty string
      // https://github.com/actions/toolkit/blob/930c89072712a3aac52d74b23338f00bb0cfcb24/packages/core/src/utils.ts#L11
      core.setOutput(key, result[key])

      if (exportEnvVariables) {
        core.exportVariable(key, result[key]?.toString() ?? '')
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
