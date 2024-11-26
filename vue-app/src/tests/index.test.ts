import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'

const tempFilePath = path.join(__dirname, 'temp.txt')

beforeEach(() => {
  // Create a temporary file
  fs.writeFileSync(tempFilePath, 'Temporary data')
})

afterEach(() => {
  // Clean up the temporary file
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath)
  }
})

describe('File tests', () => {
  it('should read data from the temporary file', () => {
    const data = fs.readFileSync(tempFilePath, 'utf-8')
    expect(data).toBe('Temporary data')
  })
})
