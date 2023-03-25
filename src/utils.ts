import * as yaml from 'js-yaml'

export function getYamlData(fileContent: string, node?: string): any {
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
