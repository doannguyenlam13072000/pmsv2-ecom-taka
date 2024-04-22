export const modalMixin = {
  data() {
    return {
      a: 'a'
    }
  },
  methods: {},
  beforeCreate() {
    console.log('Mixin beforeCreate')
  },
  created() {
    console.log('Mixin created')
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
