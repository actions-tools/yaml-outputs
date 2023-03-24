import {expect, test} from '@jest/globals'
import {flattenObject} from '../src/main'

test('parse root property', async () => {
  const flatten = flattenObject({foo: {bar: {wow: 'wow'}}, bar: 'bar'}, {})
  expect(flatten.bar).toBe('bar')
})

test('parse child property', async () => {
  const flatten = flattenObject({foo: {bar: 'bar'}}, {})
  expect(flatten.foo__bar).toBe('bar')
})

test('parse child property using separator', async () => {
  const flatten = flattenObject({foo: {bar: {wow: 'wow'}}}, {}, '', '___')
  expect(flatten.foo___bar___wow).toBe('wow')
})
