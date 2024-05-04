<script lang="ts">
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
    local: {
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
  <div class="home">
    <h1 class="text-green-500">This is an Home page</h1>
    <div>Mixin: {{ a }}</div>
    <div v-highlight>Directive highlight</div>
    <div v-custom="color">Custom directive passing color: {{ color }}</div>
    <div v-custom:background="color">Custom directive arg color: {{ color }}</div>
    <div v-custom.delay="color">Custom directive modifiers delay:</div>
    <div v-local="'Local directive'">This is</div>
  </div>
</template>
