import { mockAPI } from '@/utils/mockAPI'
export interface DemoMixinInterface {
  a: string
  // Declare other properties and methods of the mixin if needed
}

export const demoMixin = {
  data() {
    return {
      a: '' as string
    }
  },
  methods: {},
  beforeCreate() {
    console.log('Mixin beforeCreate')
  },
  async created(this: DemoMixinInterface) {
    console.log('Mixin created')
    const res = await mockAPI(3000, 'string')
    console.log('Mixin created response', res, this)
    this.a = res as string
  },
  beforeMount() {
    console.log('Mixin beforeMount')
  },
  mounted() {
    console.log('Mixin mounted')
  },
  beforeUpdate() {
    console.log('Mixin beforeUpdate')
  },
  updated() {
    console.log('Mixin updated')
  },
  beforeUnmount() {
    console.log('Mixin beforeUnmount')
  },
  unmounted() {
    console.log('Mixin unmounted')
  },
  activated() {
    console.log('Mixin objeactivatedct')
  },
  deactivated() {
    console.log('Mixin deactivated')
  },
  errorCaptured() {
    console.log('Mixin errorCaptured')
  }
}
