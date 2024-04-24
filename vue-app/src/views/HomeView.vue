<script>
import { demoMixin } from '@/mixins/DemoMixin'
export default {
  data() {
    return {
      color: '#fff'
    }
  },
  methods: {},
  mixins: [demoMixin],
  directives: {
    'local': {
      created(el, binding) {
        el.textContent += binding.value
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  unmounted() {
    console.log('unmounted')
  },
  activated() {
    console.log('objeactivatedct')
  },
  deactivated() {
    console.log('deactivated')
  },
  errorCaptured() {
    console.log('errorCaptured')
  }
}
</script>
<template>
  <div class="about">
    <h1 class="text-green-500">This is an Home page</h1>
    <p>Mixin: {{ a }}</p>
    <p v-highlight>Directive highlight</p>
    <p v-custom="color">Custom directive passing color: {{ color }}</p>
    <p v-custom:background="color">Custom directive arg color: {{ color }}</p>
    <p v-custom.delay="color">Custom directive modifiers delay: </p>
    <p v-local="'Local directive'">This is </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
