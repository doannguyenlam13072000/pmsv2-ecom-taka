import { defineStore } from 'pinia'

interface State {
  count: number
  a?: string | null
  b?: boolean
}

export const useCounterStore = defineStore('counter', {
  state: (): State => {
    return {
      count: 0,
      a: null,
      b: false
    }
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    }
  },

  actions: {
    increaseCount() {
      return this.count++
    },
    decreaseCount() {
      return this.count--
    }
  }
})
