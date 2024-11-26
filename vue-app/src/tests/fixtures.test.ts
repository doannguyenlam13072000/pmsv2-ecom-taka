import { describe, it, expect } from 'vitest'
import { createTestUser, mockDatabase } from '@/fixtures'

describe('Complex fixtures', () => {
  it('should create a test user', () => {
    const user = createTestUser()
    expect(user.name).toBe('Test User')
  })

  it('should mock a database', async () => {
    const db = mockDatabase()
    const user = await db.find()
    expect(user.name).toBe('Mocked User')
  })
})
