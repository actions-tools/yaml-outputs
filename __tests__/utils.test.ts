import {expect, test} from '@jest/globals'
import {flattenObject, getYamlData} from '../src/utils'

test('parse root property', () => {
  const flatten = flattenObject({foo: {bar: {wow: 'wow'}}, bar: 'bar'}, {})
  expect(flatten.bar).toBe('bar')
})

test('parse child property', () => {
  const flatten = flattenObject({foo: {bar: 'bar'}}, {})
  expect(flatten.foo__bar).toBe('bar')
})

test('parse child property using separator', () => {
  const flatten = flattenObject({foo: {bar: {wow: 'wow'}}}, {}, '', '___')
  expect(flatten.foo___bar___wow).toBe('wow')
})

test('parse child property with null value', () => {
  const flatten = flattenObject({foo: {bar: null}}, {}, '', '___')
  expect(flatten.foo___bar).toBe(null)
})

test('get yaml data', () => {
  const yaml = `
foo:
  bar: wow
`

  const yamlData = getYamlData(yaml)
  expect(yamlData.foo.bar).toBe('wow')
})

test('get yaml data from node', () => {
  const yaml = `
foo:
  bar: wow
`
  const yamlData = getYamlData(yaml, 'foo')
  expect(yamlData.bar).toBe('wow')
})

test('get yaml data supports empty map fields', () => {
  const yaml = `
foo:
  bar:
`
  const yamlData = getYamlData(yaml, 'foo')
  expect(yamlData.bar).toBe(null)
})
