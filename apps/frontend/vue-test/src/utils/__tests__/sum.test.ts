// sum.test.js
import { expect, test, it } from 'vitest'
import { sum } from '../number'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('add 0.1 + 0.1 to equal 0.30000000000000004', () => {
  expect(sum(0.1, 0.2)).toBe(0.30000000000000004)
})

test('adds with negative number 1 + (-2) to equal -1', () => {
  expect(sum(1, -2)).toBe(-1)
})

it('should work', (ctx) => {
  // prints name of the test
  console.log(ctx.task.name)
})

it.concurrent('math is easy', ({ expect }) => {
  expect(2 + 2).toMatchInlineSnapshot(`4`)
})

it.concurrent('math is hard', ({ expect }) => {
  expect(2 * 2).toMatchInlineSnapshot(`4`)
})

it('math is hard', ({ skip }) => {
  skip()
  expect(2 + 2).toBe(4)
})
