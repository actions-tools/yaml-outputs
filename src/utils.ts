import * as yaml from 'js-yaml'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function getYamlData(fileContent: string, node?: string): any {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  let yamlData: any = yaml.load(fileContent)

  // If a node is specified, get the node from the YAML data
  if (node) {
    const nodeParts = node.split('.')
    let currentNode = yamlData

    for (const nodePart of nodeParts) {
      currentNode = currentNode[nodePart]
    }

    yamlData = currentNode
  }

  return yamlData
}

export function flattenObject(
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  obj: any,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  result: any,
  prefix = '',
  separator = '__'
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
): any {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'object' && obj[key]) {
      flattenObject(obj[key], result, `${prefix}${key}${separator}`, separator)
      continue
    }

    result[prefix + key] = obj[key]
  }

  return result
}
