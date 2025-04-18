import { vi } from 'vitest'
export const createTestUser = () => ({
  id: Math.random(),
  name: 'Test User'
})

export const mockDatabase = () => ({
  find: vi.fn(() => Promise.resolve({ id: 1, name: 'Mocked User' }))
})
